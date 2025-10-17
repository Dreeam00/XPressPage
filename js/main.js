let selectedElement = null;
let wysiwyg, wysiwygSplit, codeFull, codeSplit;

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Get element references
    wysiwyg = document.getElementById('wysiwyg-editor');
    wysiwygSplit = document.getElementById('wysiwyg-editor-split');
    codeFull = document.getElementById('code-editor-full');
    codeSplit = document.getElementById('code-editor-split');

    const initialContent = `
<div style="
    font-family: 'Segoe UI', Arial, sans-serif;
    font-size: 12px;
    background: linear-gradient(to bottom, #F0F6FB, #E6EFF7); /* Soft gradient background */
    border: 1px solid #95B3D8;
    padding: 20px;
    margin: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.15); /* More pronounced shadow */
    border-radius: 5px; /* Slightly more rounded */
    display: flex;
    min-height: calc(100vh - 150px); /* Make it longer */
">
    <div style="flex-grow: 1; padding-right: 20px; border-right: 1px solid #C2D9F2;">
        <div style="display: flex; align-items: center; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid #C2D9F2;">
            <img src="icon.png" alt="XPress Page Icon" style="width: 48px; height: 48px; margin-right: 15px; opacity: 0.8;">
            <h1 style="
                font-size: 28px; /* Larger heading */
                color: #1E4E8A;
                margin: 0; /* Reset margin as it's in flex container */
                text-shadow: 1px 1px 2px rgba(255,255,255,0.5); /* Aero-like text shadow */
            ">Welcome to XPress Page!</h1>
        </div>

        <p style="margin-bottom: 15px; line-height: 1.6; color: #333;">
            Your intuitive web page builder, inspired by the classic Microsoft Office experience.
            Start creating beautiful and functional web pages with ease.
        </p>

        <h2 style="
            font-size: 18px;
            color: #1E4E8A;
            margin-top: 25px;
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 1px dotted #C2D9F2;
        ">Getting Started</h2>
        <ul style="list-style: none; padding: 0; margin-bottom: 20px;">
            <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
                <span style="position: absolute; left: 0; color: #0078D7;">&#x25B6;</span>
                Use the <strong>Ribbon</strong> above to insert elements like text, images, and containers.
            </li>
            <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
                <span style="position: absolute; left: 0; color: #0078D7;">&#x25B6;</span>
                Select any element on your page to edit its properties in the <strong>Properties Panel</strong> on the right.
            </li>
            <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
                <span style="position: absolute; left: 0; color: #0078D7;">&#x25B6;</span>
                Organize your page structure using the <strong>Component Tree</strong> on the left.
            </li>
        </ul>

        <h2 style="
            font-size: 18px;
            color: #1E4E8A;
            margin-top: 25px;
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 1px dotted #C2D9F2;
        ">Quick Tips</h2>
        <p style="line-height: 1.5; color: #333;">
            Experiment with different elements and styles. Don't be afraid to try new things!
            You can always delete elements you don't need.
        </p>
    </div>

    <div style="width: 250px; padding-left: 20px;">
        <div style="
            background: linear-gradient(to bottom, #EAF2FB, #D9E5F3);
            border: 1px solid #95B3D8;
            border-radius: 3px;
            padding: 15px;
            margin-bottom: 20px;
            box-shadow: 0 0 5px rgba(0,0,0,0.05);
        ">
            <h3 style="
                font-size: 14px;
                color: #1E4E8A;
                margin-top: 0;
                margin-bottom: 10px;
                padding-bottom: 5px;
                border-bottom: 1px solid #C2D9F2;
            ">Resources</h3>
            <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 5px;"><a href="#" style="color: #0078D7; text-decoration: none;">&#x25B6; XPress Page Documentation</a></li>
                <li style="margin-bottom: 5px;"><a href="#" style="color: #0078D7; text-decoration: none;">&#x25B6; Community Forums</a></li>
                <li style="margin-bottom: 5px;"><a href="#" style="color: #0078D7; text-decoration: none;">&#x25B6; Video Tutorials</a></li>
            </ul>
        </div>

        <div style="
            background: linear-gradient(to bottom, #FDFDFD, #F0F0F0);
            border: 1px solid #D6D3C6;
            border-radius: 3px;
            padding: 15px;
            box-shadow: 0 0 5px rgba(0,0,0,0.05);
        ">
            <h3 style="
                font-size: 14px;
                color: #333;
                margin-top: 0;
                margin-bottom: 10px;
                padding-bottom: 5px;
                border-bottom: 1px solid #D6D3C6;
            ">About</h3>
            <p style="font-size: 11px; color: #666;">
                XPress Page v1.0<br>
                &copy; 2025 Your Company
            </p>
        </div>
    </div>
</div>`;

    // Setup editors
    setupWysiwyg(wysiwyg, initialContent);
    setupWysiwyg(wysiwygSplit, initialContent);

    // Initial population of all views
    syncViews();

    // Setup property panel listeners
    setupPropertyListeners();

    // Disable copy for code editors
    codeFull.addEventListener('copy', (e) => e.preventDefault());
    codeSplit.addEventListener('copy', (e) => e.preventDefault());

    // --- RIBBON BUTTON LISTENERS ---
    setupRibbonListeners();

    // --- SAVE BUTTON LISTENER ---
    document.getElementById('save-html').addEventListener('click', saveHtmlToFile);
});

function setupWysiwyg(iframe, content) {
    const doc = iframe.contentDocument;
    doc.open();
    doc.write('<!DOCTYPE html><html><head><title></title></head><body></body></html>');
    doc.close();
    doc.designMode = 'on';
    doc.body.innerHTML = content;

    const style = doc.createElement('style');
    style.textContent = `body { font-family: 'Segoe UI', sans-serif; } * { outline-offset: 2px; }`;
    doc.head.appendChild(style);

    doc.addEventListener('click', (e) => selectElement(e.target, iframe));
    doc.addEventListener('keyup', syncViews);
    doc.addEventListener('mouseup', syncViews);
}

function setupRibbonListeners() {
    const insertElement = (tagName, textContent, attributes = {}) => {
        const activeWysiwyg = (document.querySelector('.view.active').id === 'split-view') ? wysiwygSplit : wysiwyg;
        const doc = activeWysiwyg.contentDocument;
        activeWysiwyg.focus();

        const selection = doc.getSelection();
        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        range.deleteContents();

        const newEl = doc.createElement(tagName);
        if (textContent) newEl.textContent = textContent;
        Object.entries(attributes).forEach(([key, value]) => newEl.setAttribute(key, value));

        range.insertNode(newEl);
        range.setStartAfter(newEl);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        syncViews();
    };

    document.getElementById('insert-div').addEventListener('click', () => insertElement('div', 'New Div', { style: 'border: 1px solid black; padding: 5px; min-height: 1em;' }));
    document.getElementById('insert-span').addEventListener('click', () => insertElement('span', 'New span.'));
    document.getElementById('insert-header').addEventListener('click', () => insertElement('header', '<h1>Page Header</h1>', { style: 'border: 1px solid #95B3D8; padding: 10px; background-color: #EAF2FB;' }));
    document.getElementById('insert-hr').addEventListener('click', () => insertElement('hr', null, { style: 'border-top: 1px solid #ccc; margin: 10px 0;' }));

    document.getElementById('insert-p').addEventListener('click', () => insertElement('p', 'New paragraph.'));
    document.getElementById('insert-h1').addEventListener('click', () => insertElement('h1', 'Heading 1'));
    document.getElementById('insert-h2').addEventListener('click', () => insertElement('h2', 'Heading 2'));
    document.getElementById('insert-h3').addEventListener('click', () => insertElement('h3', 'Heading 3'));

    document.getElementById('insert-img').addEventListener('click', () => {
        const url = prompt('Enter image URL:', 'https://via.placeholder.com/100');
        if (url) insertElement('img', null, { src: url, style: 'width: 100px;' });
    });

    document.getElementById('insert-ul').addEventListener('click', () => insertElement('ul', '<li>List Item</li>', { style: 'border: 1px dotted grey; padding: 20px;' }));
    document.getElementById('insert-ol').addEventListener('click', () => insertElement('ol', '<li>List Item</li>', { style: 'border: 1px dotted grey; padding: 20px;' }));
    document.getElementById('insert-li').addEventListener('click', () => insertElement('li', 'List Item'));

    // Font style buttons
    document.getElementById('toggle-bold').addEventListener('click', () => {
        const activeWysiwyg = (document.querySelector('.view.active').id === 'split-view') ? wysiwygSplit : wysiwyg;
        activeWysiwyg.contentDocument.execCommand('bold', false, null);
        syncViews();
    });
    document.getElementById('toggle-italic').addEventListener('click', () => {
        const activeWysiwyg = (document.querySelector('.view.active').id === 'split-view') ? wysiwygSplit : wysiwyg;
        activeWysiwyg.contentDocument.execCommand('italic', false, null);
        syncViews();
    });
    document.getElementById('toggle-underline').addEventListener('click', () => {
        const activeWysiwyg = (document.querySelector('.view.active').id === 'split-view') ? wysiwygSplit : wysiwyg;
        activeWysiwyg.contentDocument.execCommand('underline', false, null);
        syncViews();
    });

    document.getElementById('delete-element').addEventListener('click', deleteSelectedElement);
}

// --- VIEW SWITCHING ---
function switchRibbonTab(tabName) {
    document.querySelectorAll('.ribbon-tab, .ribbon-pane').forEach(el => el.classList.remove('active'));
    document.querySelector(`.ribbon-tab[onclick="switchRibbonTab('${tabName}')"]`).classList.add('active');
    document.getElementById(`ribbon-${tabName}`).classList.add('active');
}

function switchView(viewName) {
    document.querySelectorAll('.view, .tab').forEach(el => el.classList.remove('active'));
    document.getElementById(viewName + '-view').classList.add('active');
    document.querySelector(`.tab[onclick="switchView('${viewName}')"]`).classList.add('active');
    syncViews();
}

// --- CONTENT SYNCHRONIZATION ---
function syncViews() {
    setTimeout(() => {
        const activeWysiwyg = (document.querySelector('.view.active').id === 'split-view') ? wysiwygSplit : wysiwyg;
        
        // Temporarily remove selection outline to get clean HTML
        if (selectedElement) selectedElement.style.outline = '';
        const content = activeWysiwyg.contentDocument.body.innerHTML;
        if (selectedElement) selectedElement.style.outline = '2px dashed #00A8F7';

        // Sync all views
        if (document.activeElement.tagName !== 'TEXTAREA') {
            codeFull.value = content;
            codeSplit.value = content;
        }
        if (document.activeElement.ownerDocument !== wysiwyg.contentDocument) {
            wysiwyg.contentDocument.body.innerHTML = content;
        }
        if (document.activeElement.ownerDocument !== wysiwygSplit.contentDocument) {
            wysiwygSplit.contentDocument.body.innerHTML = content;
        }

        updateComponentTree();
        updatePropertiesPanel();
    }, 0);
}

// --- ELEMENT DELETION ---
function deleteSelectedElement() {
    if (selectedElement && selectedElement.tagName !== 'BODY' && selectedElement.parentNode) {
        selectedElement.parentNode.removeChild(selectedElement);
        selectedElement = null; // Deselect the element after deletion
        syncViews();
    }
}

// --- ELEMENT SELECTION & PROPERTIES ---
function selectElement(element, sourceIframe) {
    if (selectedElement) {
        selectedElement.style.outline = '';
    }
    if (element && element.tagName !== 'BODY') {
        selectedElement = element;
        selectedElement.style.outline = '2px dashed #00A8F7';
        if (sourceIframe !== wysiwyg) {
            const path = getDomPath(element);
            selectedElement = findElementByPath(wysiwyg.contentDocument.body, path);
            if(selectedElement) selectedElement.style.outline = '2px dashed #00A8F7';
        }
    }
    updatePropertiesPanel();
    highlightComponentInTree();
}

function updatePropertiesPanel() {
    const panel = document.getElementById('properties-panel');
    panel.innerHTML = '';
    if (!selectedElement) return;

    const computedStyle = window.getComputedStyle(selectedElement);

    const propConfig = [
        { type: 'group', label: 'Identity' },
        { label: 'ID', prop: 'id', type: 'text', value: selectedElement.id },
        { label: 'Class', prop: 'className', type: 'text', value: selectedElement.className },
    ];

    // Add Text Content property only for elements that can have text
    const nonTextElements = ['IMG', 'INPUT', 'BR', 'HR']; // Add more as needed
    if (!nonTextElements.includes(selectedElement.tagName)) {
        propConfig.push(
            { type: 'group', label: 'Content' },
            { label: 'Text Content', prop: 'textContent', type: 'textarea', value: selectedElement.textContent }
        );
    }

    propConfig.push(
        { type: 'group', label: 'Text' },
        { label: 'Font Family', prop: 'fontFamily', type: 'select', options: ['Arial, sans-serif', 'Verdana, sans-serif', 'Tahoma, sans-serif', 'Trebuchet MS, sans-serif', 'Georgia, serif', 'Times New Roman, serif', 'Courier New, monospace', 'Lucida Console, monospace', 'Segoe UI, sans-serif'], value: computedStyle.fontFamily },
        { label: 'Font Size', prop: 'fontSize', type: 'text', value: computedStyle.fontSize },
        { label: 'Color', prop: 'color', type: 'color', value: computedStyle.color },
        { type: 'group', label: 'Background & Border' },
        { label: 'Background Color', prop: 'backgroundColor', type: 'color', value: computedStyle.backgroundColor },
        { label: 'Background Image', prop: 'backgroundImage', type: 'text', value: computedStyle.backgroundImage },
        { label: 'Background Repeat', prop: 'backgroundRepeat', type: 'select', options: ['repeat', 'repeat-x', 'repeat-y', 'no-repeat'], value: computedStyle.backgroundRepeat },
        { label: 'Background Position', prop: 'backgroundPosition', type: 'text', value: computedStyle.backgroundPosition },
        { label: 'Background Size', prop: 'backgroundSize', type: 'text', value: computedStyle.backgroundSize },
        { label: 'Border Width', prop: 'borderWidth', type: 'text', value: computedStyle.borderWidth },
        { label: 'Border Style', prop: 'borderStyle', type: 'select', options: ['none', 'solid', 'dotted', 'dashed'], value: computedStyle.borderStyle },
        { label: 'Border Color', prop: 'borderColor', type: 'color', value: computedStyle.borderColor },
        { label: 'Border Radius', prop: 'borderRadius', type: 'text', value: computedStyle.borderRadius },
        { type: 'group', label: 'Layout' },
        { label: 'Margin', prop: 'margin', type: 'text', value: computedStyle.margin },
        { label: 'Padding', prop: 'padding', type: 'text', value: computedStyle.padding },
        { type: 'group', label: 'Flexbox (Container)' },
        { label: 'Display', prop: 'display', type: 'select', options: ['block', 'inline-block', 'flex', 'grid', 'inline', 'none'], value: computedStyle.display },
        { label: 'Flex Direction', prop: 'flexDirection', type: 'select', options: ['row', 'row-reverse', 'column', 'column-reverse'], value: computedStyle.flexDirection },
        { label: 'Justify Content', prop: 'justifyContent', type: 'select', options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'], value: computedStyle.justifyContent },
        { label: 'Align Items', prop: 'alignItems', type: 'select', options: ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'], value: computedStyle.alignItems },
    );

    propConfig.forEach(item => {
        if (item.type === 'group') {
            const groupHeader = document.createElement('div');
            groupHeader.className = 'prop-header';
            groupHeader.textContent = item.label;
            panel.appendChild(groupHeader);
            return;
        }

        const propItem = document.createElement('div');
        propItem.className = 'prop-item';
        const label = document.createElement('label');
        label.textContent = item.label;
        propItem.appendChild(label);

        let input;
        if (item.type === 'select') {
            input = document.createElement('select');
            item.options.forEach(opt => {
                const option = document.createElement('option');
                option.value = opt;
                option.textContent = opt;
                if (opt === item.value) option.selected = true;
                input.appendChild(option);
            });
        } else if (item.type === 'textarea') { // Handle textarea
            input = document.createElement('textarea');
            input.value = item.value;
            input.style.width = 'calc(100% - 10px)'; // Apply existing input style
            input.style.minHeight = '60px'; // Give it some height
        }
        else {
            input = document.createElement('input');
            input.type = item.type;
            if (item.type === 'color') {
                input.value = rgbToHex(item.value);
            } else {
                input.value = item.value;
            }
        }
        input.dataset.prop = item.prop;
        propItem.appendChild(input);
        panel.appendChild(propItem);
    });
}

function setupPropertyListeners() {
    document.getElementById('properties-panel').addEventListener('input', (e) => {
        if ((e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') && selectedElement) {
            const prop = e.target.dataset.prop;
            const value = e.target.value;

            if (prop === 'id') selectedElement.id = value;
            else if (prop === 'className') selectedElement.className = value;
            else if (prop === 'textContent') { // Handle textContent
                selectedElement.textContent = value;
            }
            else if (prop === 'backgroundColor') { // Handle background-color
                selectedElement.style.backgroundColor = value;
            }
            else if (prop === 'backgroundImage') {
                selectedElement.style.backgroundImage = value;
            }
            else if (prop === 'backgroundRepeat') {
                selectedElement.style.backgroundRepeat = value;
            }
            else if (prop === 'backgroundPosition') {
                selectedElement.style.backgroundPosition = value;
            }
            else if (prop === 'backgroundSize') {
                selectedElement.style.backgroundSize = value;
            }
            else if (prop === 'fontFamily') { // Handle font-family
                selectedElement.style.fontFamily = value;
            }
            else {
                const styleProp = prop.replace(/-([a-z])/g, g => g[1].toUpperCase());
                selectedElement.style[styleProp] = value;
            }
            setTimeout(() => {
                const content = wysiwyg.contentDocument.body.innerHTML;
                codeFull.value = content;
                codeSplit.value = content;
            }, 100);
        }
    });
}

// ... (The rest of the file remains the same: Component Tree, DOM Path Utils, etc.) ...

// --- COMPONENT TREE ---
function updateComponentTree() {
    const tree = document.getElementById('component-tree');
    tree.innerHTML = '';
    buildTree(wysiwyg.contentDocument.body, tree, 0);
    highlightComponentInTree();
}

function buildTree(root, parentElement, depth) {
    const children = root.children;
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const li = document.createElement('li');
        li.draggable = true;
        li.dataset.path = getDomPath(child);

        const titleSpan = document.createElement('span');
        titleSpan.className = 'tree-item-title';

        let content = '';
        if (child.children.length > 0) {
            content += '<span class="toggle">+</span> ';
        } else {
            content += '<span class="toggle-placeholder"></span> ';
        }
        content += `&lt;${child.tagName.toLowerCase()}&gt;`;
        titleSpan.innerHTML = content;
        li.appendChild(titleSpan);

        if (child.children.length > 0) {
            const nestedUl = document.createElement('ul');
            nestedUl.style.display = 'none';
            buildTree(child, nestedUl, depth + 1);
            li.appendChild(nestedUl);
        }
        parentElement.appendChild(li);
    }
}

// --- TREE EVENT LISTENERS (Delegated from parent) ---
document.getElementById('component-tree').addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle')) {
        const nestedUl = e.target.parentElement.parentElement.querySelector('ul');
        if (nestedUl) {
            if (nestedUl.style.display === 'none') {
                nestedUl.style.display = 'block';
                e.target.textContent = '-';
            } else {
                nestedUl.style.display = 'none';
                e.target.textContent = '+';
            }
        }
        return;
    }

    const title = e.target.closest('.tree-item-title');
    if (title) {
        const path = title.parentElement.dataset.path.split('-').map(Number);
        const targetElement = findElementByPath(wysiwyg.contentDocument.body, path);
        if (targetElement) {
            selectElement(targetElement, wysiwyg);
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

let draggedElementPath = null;

document.getElementById('component-tree').addEventListener('dragstart', (e) => {
    draggedElementPath = e.target.dataset.path;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
});

document.getElementById('component-tree').addEventListener('dragend', (e) => {
    e.target.classList.remove('dragging');
    document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
});

document.getElementById('component-tree').addEventListener('dragover', (e) => {
    e.preventDefault();
    document.querySelectorAll('.drag-over-into, .drag-over-before, .drag-over-after').forEach(el => el.classList.remove('drag-over-into', 'drag-over-before', 'drag-over-after'));

    const targetLi = e.target.closest('li');
    if (!targetLi) return;

    const rect = targetLi.getBoundingClientRect();
    const y = e.clientY - rect.top; // Y position within the targetLi

    const third = rect.height / 3;

    if (y < third) {
        // Top third: insert before
        targetLi.classList.add('drag-over-before');
    } else if (y > third * 2) {
        // Bottom third: insert after
        targetLi.classList.add('drag-over-after');
    } else {
        // Middle third: insert into
        targetLi.classList.add('drag-over-into');
    }
});

document.getElementById('component-tree').addEventListener('drop', (e) => {
    e.preventDefault();
    document.querySelectorAll('.drag-over-into, .drag-over-before, .drag-over-after').forEach(el => el.classList.remove('drag-over-into', 'drag-over-before', 'drag-over-after'));

    const dropTargetLi = e.target.closest('li');
    if (!dropTargetLi || !draggedElementPath) return;

    const draggedPath = draggedElementPath.split('-').map(Number);
    const dropTargetPath = dropTargetLi.dataset.path.split('-').map(Number);

    const draggedEl = findElementByPath(wysiwyg.contentDocument.body, draggedPath);
    const dropTargetEl = findElementByPath(wysiwyg.contentDocument.body, dropTargetPath);

    if (draggedEl && dropTargetEl && draggedEl !== dropTargetEl) {
        if (dropTargetLi.classList.contains('drag-over-into')) {
            // Insert into the drop target
            dropTargetEl.appendChild(draggedEl);
        } else if (dropTargetLi.classList.contains('drag-over-before')) {
            // Insert before the drop target
            dropTargetEl.parentNode.insertBefore(draggedEl, dropTargetEl);
        } else if (dropTargetLi.classList.contains('drag-over-after')) {
            // Insert after the drop target
            dropTargetEl.parentNode.insertBefore(draggedEl, dropTargetEl.nextSibling);
        }
        syncViews();
    }
    draggedElementPath = null;
});

function highlightComponentInTree() {
    document.querySelectorAll('#component-tree .tree-item-title').forEach(li => li.classList.remove('selected'));
    if (selectedElement) {
        const path = getDomPath(selectedElement);
        const li = document.querySelector(`#component-tree li[data-path="${path}"] .tree-item-title`);
        if (li) {
            li.classList.add('selected');
            let current = li.parentElement.parentElement;
            while (current && current.id !== 'component-tree') {
                if (current.tagName === 'UL') {
                    current.style.display = 'block';
                    const toggle = current.parentElement.querySelector('.toggle');
                    if(toggle) toggle.textContent = '-';
                }
                current = current.parentElement;
            }
        }
    }
}

// --- DOM PATH UTILS ---
function getDomPath(el) {
    const stack = [];
    while (el.parentElement && el.tagName !== 'BODY') {
        const index = Array.from(el.parentElement.children).indexOf(el);
        stack.unshift(index);
        el = el.parentElement;
    }
    return stack.join('-');
}

function findElementByPath(root, path) {
    let el = root;
    for (const index of path) {
        if (el && el.children[index]) {
            el = el.children[index];
        } else {
            return null;
        }
    }
    return el;
}

async function convertImageToBase64(imageUrl) {
    try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
            console.warn(`Failed to fetch image ${imageUrl}: ${response.statusText}`);
            return imageUrl; // Return original URL on fetch failure
        }
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error(`Error converting image ${imageUrl} to base64:`, error);
        return imageUrl; // Return original URL on error
    }
}

function rgbToHex(rgb) {
    if (!rgb || !rgb.startsWith('rgb')) return '#000000';
    const match = rgb.match(/rgba?\((\d+), (\d+), (\d+)/);
    if (!match) return '#000000';
    const [, r, g, b] = match.map(Number);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

// --- FILE OPERATIONS ---
async function saveHtmlToFile() {
    let htmlContent = codeFull.value; // Get content from the full code editor

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const images = doc.querySelectorAll('img');

    const conversionPromises = [];
    images.forEach(img => {
        const originalSrc = img.getAttribute('src');
        if (originalSrc && !originalSrc.startsWith('data:image')) {
            conversionPromises.push(convertImageToBase64(originalSrc).then(base64Src => {
                img.setAttribute('src', base64Src);
            }));
        }
    });

    await Promise.all(conversionPromises);

    // Get the modified HTML from the body of the parsed document
    htmlContent = doc.body.innerHTML;

    // Append the banner to the saved HTML content
    const bannerHtml = `
        <div style="
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: #f0f0f0;
            border-top: 1px solid #ccc;
            padding: 10px;
            text-align: center;
            font-family: 'Segoe UI', Arial, sans-serif;
            font-size: 12px;
            color: #333;
            z-index: 9999;
        ">
            This page was created with XPress Page. <a href="https://dreeam00.github.io/XPressPage" target="_blank" style="color: #0078D7; text-decoration: none;">Learn more</a>
        </div>
    `;
    htmlContent += bannerHtml;

    // Append the bottom-left banner to the saved HTML content
    const bottomLeftBannerHtml = `
        <a href="https://dreeam00.github.io/XPressPage" target="_blank" style="
            position: fixed;
            bottom: 10px;
            left: 10px;
            z-index: 9999;
            display: block;
        ">
            <img src="https://dreeam00.github.io/XPressPage/banner.png" alt="XPress Page Banner" style="
                width: 100px;
                height: auto;
                border: none;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                border-radius: 5px;
            ">
        </a>
    `;
    htmlContent += bottomLeftBannerHtml;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'index.html'; // Default filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href); // Clean up the URL object
}