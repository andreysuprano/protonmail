import { createContext, useContext, useRef } from 'react';

import { useApi } from '@proton/components';
import { queryShareURLAuth, queryInitSRPHandshake } from '@proton/shared/lib/api/drive/sharing';
import { srpAuth } from '@proton/shared/lib/srp';
import { getApiError } from '@proton/shared/lib/api/helpers/apiErrorHelper';
import { SRPHandshakeInfo } from '@proton/shared/lib/interfaces/drive/sharing';
import { withAuthHeaders } from '@proton/shared/lib/fetch/headers';

import retryOnError from '../../utils/retryOnError';
import { hasCustomPassword, hasGeneratedPasswordIncluded } from '../_shares';
import useDebouncedRequest from './useDebouncedRequest';

export const ERROR_CODE_INVALID_SRP_PARAMS = 2026;
const AUTH_RETRY_COUNT = 2;

interface SessionInfo {
    token: string;
    password: string;
    accessToken: string;
    sessionUid: string;
}

/**
 * usePublicSession maintain authentication of public session for shared links.
 * To properly authenticate, user should first init SRP handshake, followed by
 * unlocking session with password. Then any allowed request for this session
 * can be made. In case the access token expires, request will automatically
 * reauth with the same token and password and retry.
 */
function usePublicSessionProvider() {
    const api = useApi();
    const debouncedRequest = useDebouncedRequest();
    const sessionInfo = useRef<SessionInfo>();

    const initHandshake = async (token: string) => {
        return api<SRPHandshakeInfo>(queryInitSRPHandshake(token)).then((handshakeInfo) => {
            return {
                handshakeInfo,
                hasCustomPassword: hasCustomPassword(handshakeInfo),
                hasGeneratedPasswordIncluded: hasGeneratedPasswordIncluded(handshakeInfo),
            };
        });
    };

    const getSessionToken = async (token: string, password: string, initHandshake: SRPHandshakeInfo) => {
        const { Modulus, ServerEphemeral, UrlPasswordSalt, SRPSession, Version } = initHandshake;
        return srpAuth<{ AccessToken: string; UID: string }>({
            api,
            credentials: { password },
            info: {
                Modulus,
                ServerEphemeral,
                Version,
                Salt: UrlPasswordSalt,
                SRPSession,
            },
            config: queryShareURLAuth(token),
        });
    };

    const initSession = async (token: string, password: string, handshakeInfo: SRPHandshakeInfo) => {
        return getSessionToken(token, password, handshakeInfo).then(({ AccessToken, UID }) => {
            sessionInfo.current = {
                token,
                password,
                accessToken: AccessToken,
                sessionUid: UID,
            };
            return sessionInfo.current;
        });
    };

    const queryWithHeaders = (query: any) => {
        if (!sessionInfo.current) {
            // This should not happend. If you see this, it indicate wrong flow.
            throw new Error('Cannot query unauthenticated session');
        }

        return withAuthHeaders(sessionInfo.current.sessionUid, sessionInfo.current.accessToken, query);
    };

    const shouldReauth = (error: any) => {
        const apiError = getApiError(error);
        return apiError.code === ERROR_CODE_INVALID_SRP_PARAMS;
    };

    const reauth = async () => {
        if (!sessionInfo.current) {
            // This should not happend. If you see this, it indicate wrong flow.
            throw new Error('Cannot reauth unauthenticated session');
        }

        const { handshakeInfo } = await initHandshake(sessionInfo.current.token);
        await initSession(sessionInfo.current.token, sessionInfo.current.password, handshakeInfo);
    };

    const request = <T,>(args: any, abortSignal?: AbortSignal) => {
        const fn = () => debouncedRequest<T>(queryWithHeaders(args), abortSignal);

        return retryOnError<T>({
            fn,
            shouldRetryBasedOnError: shouldReauth,
            beforeRetryCallback: reauth,
            maxRetriesNumber: AUTH_RETRY_COUNT,
        })();
    };

    const getSessionInfo = () => sessionInfo.current;

    return {
        initHandshake,
        initSession,
        request,
        getSessionInfo,
    };
}

const PublicSessionContext = createContext<ReturnType<typeof usePublicSessionProvider> | null>(null);

export function PublicSessionProvider({ children }: { children: React.ReactNode }) {
    const value = usePublicSessionProvider();
    return <PublicSessionContext.Provider value={value}>{children}</PublicSessionContext.Provider>;
}

export default function usePublicSession() {
    const state = useContext(PublicSessionContext);
    if (!state) {
        throw new Error('Trying to use uninitialized PublicSessionProvider');
    }
    return state;
}