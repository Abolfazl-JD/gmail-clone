import { computed } from 'vue'
import { SelectionGmail } from '../stores/EmailSelection'

export default function bulkActions() {
    const emailSelection = SelectionGmail()
    const disableMarkRead = computed(() => [...emailSelection.gmails].every(email => email.read))
    const disableMarkUnread = computed(() => [...emailSelection.gmails].every(email => !email.read))
    const disableArchived = computed(() => [...emailSelection.gmails].every(email => email.archived))
    const disableUnArchived = computed(() => [...emailSelection.gmails].every(email => !email.archived))
    return {
        disableArchived,
        disableUnArchived,
        disableMarkRead,
        disableMarkUnread
    }
}