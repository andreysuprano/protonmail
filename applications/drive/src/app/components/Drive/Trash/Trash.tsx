import React from 'react';
import FileBrowser, { FileBrowserItem } from '../../FileBrowser/FileBrowser';
import useFileBrowser from '../../FileBrowser/useFileBrowser';
import EmptyFolder from '../../FileBrowser/EmptyFolder';

interface Props {
    loading: boolean;
    complete: boolean;
    contents: FileBrowserItem[];
    fileBrowserControls: ReturnType<typeof useFileBrowser>;
}

function Trash({ loading, complete, contents, fileBrowserControls }: Props) {
    const {
        clearSelections,
        selectedItems,
        selectItem,
        toggleSelectItem,
        toggleAllSelected,
        selectRange
    } = fileBrowserControls;

    return complete && !contents.length && !loading ? (
        <EmptyFolder />
    ) : (
        <FileBrowser
            loading={loading}
            contents={contents}
            selectedItems={selectedItems}
            onItemClick={selectItem}
            onToggleItemSelected={toggleSelectItem}
            onEmptyAreaClick={clearSelections}
            onToggleAllSelected={toggleAllSelected}
            onShiftClick={selectRange}
        />
    );
}

export default Trash;
