import { EncryptedSearchFunctions } from '@proton/encrypted-search';

export interface ESLink {
    createTime: number;
    decryptedName: string;
    id: string;
    linkId: string;
    MIMEType: string;
    modifiedTime: number;
    parentLinkId: string | null;
    shareId: string;
    size: number;
    order: number;
}

export interface ESDriveSearchParams {
    normalisedKeywords: string[] | undefined;
}

export interface EncryptedSearchFunctionsDrive
    extends Pick<
        EncryptedSearchFunctions<ESLink, ESDriveSearchParams>,
        | 'handleEvent'
        | 'encryptedSearch'
        | 'enableEncryptedSearch'
        | 'esDelete'
        | 'getESDBStatus'
        | 'getProgressRecorderRef'
        | 'cacheIndexedDB'
    > {}

export interface Session {
    sessionName: string;
    total: number;
    isDone: boolean;
}
