import { c } from 'ttag';

import { Button } from '@proton/atoms';
import {
    FeatureCode,
    Icon,
    Tooltip,
    useApi,
    useEventManager,
    useFeature,
    useNotifications,
    useUser,
} from '@proton/components';
import clsx from '@proton/utils/clsx';

import { canSetExpiration } from '../../../helpers/expiration';
import useExpiration from '../../../hooks/useExpiration';
import { expireMessages } from '../../../logic/messages/expire/messagesExpireActions';
import { MessageState } from '../../../logic/messages/messagesTypes';
import { useAppDispatch } from '../../../logic/store';

interface Props {
    message: MessageState;
}

const ExtraExpirationTime = ({ message }: Props) => {
    const { expirationMessage, expiresInLessThan24Hours, expirationDate } = useExpiration(message);

    const api = useApi();
    const [user] = useUser();
    const { call } = useEventManager();
    const { createNotification } = useNotifications();
    const { feature } = useFeature(FeatureCode.SetExpiration);

    const dispatch = useAppDispatch();

    const canExpire = canSetExpiration(feature?.Value, user, message);

    const messageID = message.data?.ID || '';
    const conversationID = message.data?.ConversationID;

    if (!expirationDate) {
        return null;
    }

    const handleClick = () => {
        if (user.isFree) {
            return;
        }
        void dispatch(
            expireMessages({
                IDs: [messageID],
                conversationID,
                expirationTime: null,
                api,
                call,
            })
        );
        createNotification({ text: c('Success').t`Message expiration cancelled` });
    };

    return (
        <div
            className={clsx(
                'bg-norm rounded border pl0-5 pr0-25 on-mobile-pr0-5 on-mobile-pb0-5 py0-25 mb0-85 flex flex-nowrap on-mobile-flex-column',
                expiresInLessThan24Hours && 'color-danger border-danger'
            )}
        >
            <div className="flex-item-fluid flex flex-nowrap on-mobile-mb0-5" data-testid="expiration-banner">
                <Icon name="hourglass" className="mt0-4 flex-item-noshrink ml0-2" />
                <span
                    className={clsx(!canExpire && 'mt0-25', 'pl0-5 pr0-5 flex flex-item-fluid flex-align-items-center')}
                >
                    {expirationMessage}
                </span>
            </div>
            {canExpire ? (
                <span className="flex-item-noshrink flex-align-items-start flex on-mobile-w100 pt0-1">
                    <Tooltip title={c('Cancel expiration of the message').t`Cancel expiration`}>
                        <Button
                            onClick={handleClick}
                            size="small"
                            color="weak"
                            shape="outline"
                            fullWidth
                            className="rounded-sm"
                            data-testid="unsubscribe-banner"
                        >
                            {c('Cancel expiration of the message').t`Cancel`}
                        </Button>
                    </Tooltip>
                </span>
            ) : null}
        </div>
    );
};

export default ExtraExpirationTime;
