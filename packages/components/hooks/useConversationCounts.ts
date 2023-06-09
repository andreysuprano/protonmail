import { useCallback } from 'react';

import { LabelCount } from '@proton/shared/lib/interfaces/Label';
import { ConversationCountsModel } from '@proton/shared/lib/models/conversationCountsModel';

import useApi from './useApi';
import useCache from './useCache';
import useCachedModelResult, { getPromiseValue } from './useCachedModelResult';

export const useGetConversationCounts = (): (() => Promise<LabelCount[]>) => {
    const api = useApi();
    const cache = useCache();
    const miss = useCallback(() => ConversationCountsModel.get(api), [api]);
    return useCallback(() => {
        return getPromiseValue(cache, ConversationCountsModel.key, miss);
    }, [cache, miss]);
};

export const useConversationCounts = (): [LabelCount[], boolean, any] => {
    const cache = useCache();
    const miss = useGetConversationCounts();
    return useCachedModelResult(cache, ConversationCountsModel.key, miss);
};
