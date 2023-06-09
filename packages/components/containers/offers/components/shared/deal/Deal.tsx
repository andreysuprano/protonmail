import { ReactNode, forwardRef } from 'react';

import { c } from 'ttag';

import { CYCLE } from '@proton/shared/lib/constants';
import { getNormalCycleFromCustomCycle } from '@proton/shared/lib/helpers/subscription';
import clsx from '@proton/utils/clsx';

import { getDiscountWithCoupon } from '../../../helpers/dealPrices';
import type { Offer, OfferProps } from '../../../interface';
import { DealProvider } from './DealContext';

interface Props extends OfferProps {
    deal: Offer['deals'][number];
    children: ReactNode;
}

const Deal = forwardRef<HTMLDivElement, Props>(({ children, ...props }: Props, ref) => {
    const { popular, cycle } = props.deal;
    const discount = getDiscountWithCoupon({ ...props.deal, cycle: getNormalCycleFromCustomCycle(cycle) as CYCLE });

    return (
        <DealProvider {...props}>
            <div
                ref={ref}
                className={clsx([
                    'relative flex flex-item-fluid offer-plan-container on-mobile-mt1',
                    popular && 'offer-plan-container--mostPopular',
                ])}
            >
                {discount ? (
                    <span
                        className={clsx([
                            'text-semibold absolute text-center offer-percentage py0-25 px1',
                            popular ? 'bg-primary' : 'bg-weak color-weak border border-norm',
                        ])}
                    >
                        {c('specialoffer: Offers').t`Save ${discount}%`}
                    </span>
                ) : null}
                <div
                    className={clsx([
                        'offer-plan w100 border rounded p1 mb1 flex flex-column flex-align-items-center flex-justify-end',
                        popular && 'border-primary is-focused',
                    ])}
                >
                    {children}
                </div>
            </div>
        </DealProvider>
    );
});

Deal.displayName = 'Deal';

export default Deal;
