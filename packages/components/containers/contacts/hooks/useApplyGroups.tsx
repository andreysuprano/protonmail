import { useCallback } from 'react';

import { c } from 'ttag';

import { labelContactEmails, unLabelContactEmails } from '@proton/shared/lib/api/contacts';
import { Contact, ContactEmail } from '@proton/shared/lib/interfaces/contacts';

import { useApi, useContacts, useEventManager, useNotifications } from '../../../hooks';
import { SelectEmailsProps } from '../modals/SelectEmailsModal';

/**
 * Collect contacts having multiple emails
 * Used for <SelectEmailsModal />
 */
export const collectContacts = (contactEmails: ContactEmail[] = [], contacts: Contact[]) => {
    return contactEmails.reduce(
        (acc, { ContactID }) => {
            acc.duplicate[ContactID] = (acc.duplicate[ContactID] || 0) + 1;

            if (acc.duplicate[ContactID] === 2) {
                const contact = contacts.find(({ ID }: { ID: string }) => ID === ContactID);
                if (contact) {
                    acc.contacts.push(contact);
                }
            }

            return acc;
        },
        {
            contacts: [] as Contact[],
            duplicate: Object.create(null),
        }
    );
};

/**
 * Returns a reusable action to apply or remove groups to a list of contact emails
 */
const useApplyGroups = (
    onLock?: (lock: boolean) => void,
    setLoading?: (loading: boolean) => void,
    onSelectEmails?: (props: SelectEmailsProps) => Promise<ContactEmail[]>
) => {
    const { createNotification } = useNotifications();
    const { call } = useEventManager();
    const api = useApi();
    const [contacts] = useContacts() as [Contact[], boolean, any];

    const applyGroups = useCallback(
        async (contactEmails: ContactEmail[], changes: { [groupID: string]: boolean }, preventNotification = false) => {
            const { contacts: collectedContacts } = collectContacts(contactEmails, contacts);

            // contact emails in contacts with only one email (and then, skipping the modal)
            const simpleEmails = contactEmails.filter(
                (contactEmail) => !collectedContacts.find((contact) => contactEmail.ContactID === contact.ID)
            );

            // contact emails in contacts with multiple email (and then, passing through the modal)
            let selectedEmails: ContactEmail[] = [];

            if (collectedContacts.length) {
                const groupIDs = Object.entries(changes)
                    .filter(([, isChecked]) => isChecked)
                    .map(([groupID]) => groupID);

                if (groupIDs.length) {
                    setLoading?.(false);
                    selectedEmails = (await onSelectEmails?.({ groupIDs, contacts: collectedContacts, onLock })) || [];
                    setLoading?.(true);
                }
            }

            // When removing a group, we remove it for all emails selected
            const listForRemoving = [...contactEmails];

            // When adding a group, we do it only for the selected ones
            const listForAdding = [...simpleEmails, ...selectedEmails];

            const groupEntries = Object.entries(changes);
            await Promise.all(
                groupEntries.map(([groupID, isChecked]) => {
                    if (isChecked) {
                        const toLabel = listForAdding
                            .filter(({ LabelIDs = [] }) => !LabelIDs.includes(groupID))
                            .map(({ ID }) => ID);
                        if (!toLabel.length) {
                            return Promise.resolve();
                        }
                        return api(labelContactEmails({ LabelID: groupID, ContactEmailIDs: toLabel }));
                    }

                    const toUnlabel = listForRemoving
                        .filter(({ LabelIDs = [] }) => LabelIDs.includes(groupID))
                        .map(({ ID }) => ID);

                    if (!toUnlabel.length) {
                        return Promise.resolve();
                    }
                    return api(unLabelContactEmails({ LabelID: groupID, ContactEmailIDs: toUnlabel }));
                })
            );

            await call();

            if (!preventNotification) {
                createNotification({ text: c('Info').t`Group assignment applied` });
            }
        },
        [contacts]
    );

    return applyGroups;
};

export default useApplyGroups;
