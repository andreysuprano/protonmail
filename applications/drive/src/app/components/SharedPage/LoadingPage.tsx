import { c } from 'ttag';

import { LoaderPage } from '@proton/components';

import SharedPageLayout from './Layout/SharedPageLayout';

export default function LoadingPage() {
    return (
        <SharedPageLayout>
            <div className="flex flex-column flex-align-items-center flex-justify-center w100 h100">
                <LoaderPage text={c('Info').t`Decrypting files`} />
            </div>
        </SharedPageLayout>
    );
}
