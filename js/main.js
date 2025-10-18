let selectedElement = null;
let wysiwyg, wysiwygSplit, codeFull, codeSplit;

// Global references for dialog elements
let insertDialogOverlay, dialogElementType, dialogInsertBtn, dialogCancelBtn;
let attributeDialogOverlay, attributeDialogTitle, attributeFields, attributeInsertBtn, attributeCancelBtn;
let attributeIcon;
let alertDialogOverlay, alertMessage, alertOkBtn;
let promptDialogOverlay, promptMessage, promptInput, promptOkBtn, promptCancelBtn;
let confirmDialogOverlay, confirmMessage, confirmOkBtn, confirmCancelBtn;

let alertIcon, promptIcon, confirmIcon, clippyAssistant, clippySpeechBubble, clippyHintText, clippyTriviaButton, clippyTriviaDisplay, clippyGeneralHintButton, clippyGeneralHintDisplay;

let currentElementTypeForAttributeDialog = ''; // To store the element type being configured

const triviaFacts = [
    "XPress Pageは、直感的なウェブページビルダーです。",
    "リボンUIを使って、様々な要素を簡単に挿入できます。",
    "要素を選択すると、右側のプロパティパネルでスタイルを編集できます。",
    "左側のコンポーネントツリーで、ページの構造を確認・操作できます。",
    "デザインビュー、分割ビュー、コードビューを切り替えて作業できます。",
    "作成したHTMLは、ボタン一つでファイルに保存できます。",
    "画像は自動的にBase64形式に変換して埋め込むことができます。",
    "カスタムダイアログで、要素の属性を詳細に設定できます。",
    "XPress Pageは、Microsoft Officeのクラシックな体験にインスパイアされています。",
    "このアプリケーションは、ウェブ開発をより身近にするために設計されました。",
    "XPress Pageでは、リアルタイムで変更をプレビューできます。",
    "ドラッグ＆ドロップで要素の配置を調整できます。",
    "CSSの知識がなくても、プロパティパネルでスタイルを適用できます。",
    "HTMLのコードを直接編集して、より高度なカスタマイズも可能です。",
    "XPress Pageは、ウェブサイト作成の学習ツールとしても活用できます。"
];

const generalHints = [
    "新しい要素を挿入するには、上部のリボンにある「Insert」タブをクリックしてください。",
    "要素のプロパティを変更するには、デザインビューで要素を選択し、右側の「Properties」パネルを使用してください。",
    "ページの構造を把握するには、左側の「Component Tree」を確認してください。",
    "HTMLコードを直接編集したい場合は、「Code」ビューに切り替えてください。",
    "作業内容を保存するには、ヘッダーのフロッピーディスクアイコンをクリックしてください。",
    "要素を移動するには、「Component Tree」で要素を選択し、上下の矢印ボタンを使用してください。",
    "不要な要素は、「Home」タブの「Delete」ボタンで削除できます。",
    "リンクや画像などの属性を持つ要素を挿入する際は、表示されるダイアログで詳細を設定できます。",
    "WYSIWYGエディタで直接テキストを編集することも可能です。",
    "分割ビューでは、デザインとコードを同時に確認しながら作業できます。"
];

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Get element references
    wysiwyg = document.getElementById('wysiwyg-editor');
    wysiwygSplit = document.getElementById('wysiwyg-editor-split');
    codeFull = document.getElementById('code-editor-full');
    codeSplit = document.getElementById('code-editor-split');

    clippyAssistant = document.getElementById('clippy-assistant');
    clippySpeechBubble = document.getElementById('clippy-speech-bubble');
    clippyHintText = document.getElementById('clippy-hint-text');
    clippyTriviaButton = document.getElementById('clippy-trivia-button');
    clippyTriviaDisplay = document.getElementById('clippy-trivia-display');
    clippyGeneralHintButton = document.getElementById('clippy-general-hint-button');
    clippyGeneralHintDisplay = document.getElementById('clippy-general-hint-display');
    const toggleClippyButton = document.getElementById('toggle-clippy-button');

    // Restore Clippy's visibility from localStorage
    const clippyVisibility = localStorage.getItem('clippyVisibility');
    if (clippyVisibility === 'hidden') {
        clippyAssistant.style.display = 'none';
    } else {
        clippyAssistant.style.display = 'block';
    }

    console.log('clippyAssistant:', clippyAssistant);
    console.log('clippySpeechBubble:', clippySpeechBubble);
    console.log('clippyHintText:', clippyHintText);
    console.log('clippyTriviaButton:', clippyTriviaButton);
    console.log('clippyTriviaDisplay:', clippyTriviaDisplay);
    console.log('clippyGeneralHintButton:', clippyGeneralHintButton);
    console.log('clippyGeneralHintDisplay:', clippyGeneralHintDisplay);
    console.log('toggleClippyButton:', toggleClippyButton);

    console.log('--- Initial State ---');
    console.log('clippySpeechBubble display:', window.getComputedStyle(clippySpeechBubble).display);
    console.log('clippySpeechBubble classList:', clippySpeechBubble.classList.value);
    console.log('clippyHintText display:', window.getComputedStyle(clippyHintText).display);
    console.log('clippyHintText classList:', clippyHintText.classList.value);
    console.log('clippyTriviaDisplay display:', window.getComputedStyle(clippyTriviaDisplay).display);
    console.log('clippyTriviaDisplay classList:', clippyTriviaDisplay.classList.value);
    console.log('clippyGeneralHintDisplay display:', window.getComputedStyle(clippyGeneralHintDisplay).display);
    console.log('clippyGeneralHintDisplay classList:', clippyGeneralHintDisplay.classList.value);

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
            ">XPress Pageへようこそ！</h1>
        </div>

        <p style="margin-bottom: 15px; line-height: 1.6; color: #333;">
            クラシックなMicrosoft Office体験にインスパイアされた、直感的なウェブページビルダーです。
            美しく機能的なウェブページを簡単に作成し始めましょう。
        </p>

        <h2 style="
            font-size: 18px;
            color: #1E4E8A;
            margin-top: 25px;
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 1px dotted #C2D9F2;
        ">はじめに</h2>
        <ul style="list-style: none; padding: 0; margin-bottom: 20px;">
            <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
                <span style="position: absolute; left: 0; color: #0078D7;">&#x25B6;</span>
                上の<strong>リボン</strong>を使って、テキスト、画像、コンテナなどの要素を挿入します。
            </li>
            <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
                <span style="position: absolute; left: 0; color: #0078D7;">&#x25B6;</span>
                ページ上の任意の要素を選択して、右側の<strong>プロパティパネル</strong>でプロパティを編集します。
            </li>
            <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
                <span style="position: absolute; left: 0; color: #0078D7;">&#x25B6;</span>
                左側の<strong>コンポーネントツリー</strong>を使って、ページ構造を整理します。
            </li>
        </ul>

        <h2 style="
            font-size: 18px;
            color: #1E4E8A;
            margin-top: 25px;
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 1px dotted #C2D9F2;
        ">クイックヒント</h2>
        <p style="line-height: 1.5; color: #333;">
            様々な要素やスタイルを試してみてください。新しいことを恐れずに挑戦しましょう！
            不要な要素はいつでも削除できます。
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
            ">リソース</h3>
            <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 5px;"><a href="#" style="color: #0078D7; text-decoration: none;">&#x25B6; XPress Page ドキュメント</a></li>
                <li style="margin-bottom: 5px;"><a href="#" style="color: #0078D7; text-decoration: none;">&#x25B6; コミュニティフォーラム</a></li>
                <li style="margin-bottom: 5px;"><a href="#" style="color: #0078D7; text-decoration: none;">&#x25B6; ビデオチュートリアル</a></li>
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
            ">概要</h3>
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

    // --- COMPONENT TREE BUTTON LISTENERS ---
    document.getElementById('move-up').addEventListener('click', moveElementUp);
    document.getElementById('move-down').addEventListener('click', moveElementDown);

    // --- SAVE BUTTON LISTENER ---
    document.getElementById('save-html').addEventListener('click', saveHtmlToFile);

    // --- CUSTOM DIALOG ELEMENTS ---
    insertDialogOverlay = document.getElementById('insert-dialog-overlay');
    dialogElementType = document.getElementById('dialog-element-type');
    dialogInsertBtn = document.getElementById('dialog-insert-btn');
    dialogCancelBtn = document.getElementById('dialog-cancel-btn');

    attributeDialogOverlay = document.getElementById('attribute-dialog-overlay');
    attributeDialogTitle = document.getElementById('attribute-dialog-title');
    attributeFields = document.getElementById('attribute-fields');
    attributeInsertBtn = document.getElementById('attribute-insert-btn');
    attributeCancelBtn = document.getElementById('attribute-cancel-btn');
    attributeIcon = document.getElementById('attribute-icon');

    // Custom Alert Dialog Elements
    alertDialogOverlay = document.getElementById('alert-dialog-overlay');
    alertMessage = document.getElementById('alert-message');
    alertOkBtn = document.getElementById('alert-ok-btn');

    // Custom Prompt Dialog Elements
    promptDialogOverlay = document.getElementById('prompt-dialog-overlay');
    promptMessage = document.getElementById('prompt-message');
    promptInput = document.getElementById('prompt-input');
    promptOkBtn = document.getElementById('prompt-ok-btn');
    promptCancelBtn = document.getElementById('prompt-cancel-btn');

    // Custom Confirm Dialog Elements
    confirmDialogOverlay = document.getElementById('confirm-dialog-overlay');
    confirmMessage = document.getElementById('confirm-message');
    confirmOkBtn = document.getElementById('confirm-ok-btn');
    confirmCancelBtn = document.getElementById('confirm-cancel-btn');

    alertIcon = document.getElementById('alert-icon');
    promptIcon = document.getElementById('prompt-icon');
    confirmIcon = document.getElementById('confirm-icon');

    // --- DIALOG EVENT LISTENERS ---
    dialogInsertBtn.addEventListener('click', () => {
        const elementType = dialogElementType.value;
        const targetElement = selectedElement || wysiwyg.contentDocument.body;

        if (elementType === 'a' || elementType === 'input') {
            hideInsertDialog();
            showAttributeDialog(elementType);
        } else {
            // For other elements, check if targetElement is a valid container
            if (targetElement.tagName === 'DIV' || targetElement.tagName === 'OL' || targetElement.tagName === 'UL' || targetElement.tagName === 'BODY') {
                const newElement = wysiwyg.contentDocument.createElement(elementType);
                newElement.textContent = `New ${elementType}`;
                targetElement.appendChild(newElement);
                syncViews();
                hideInsertDialog();
            } else {
                customAlert('DIV、OL、UL、またはBODY要素を選択して挿入してください。');
            }
        }
    });

    dialogCancelBtn.addEventListener('click', hideInsertDialog);

    // --- ATTRIBUTE DIALOG EVENT LISTENERS ---
    attributeInsertBtn.addEventListener('click', () => {
        const elementType = currentElementTypeForAttributeDialog;
        const targetElement = selectedElement || wysiwyg.contentDocument.body;

        const newElement = wysiwyg.contentDocument.createElement(elementType);
        if (elementType === 'a') {
            newElement.href = document.getElementById('attr-href').value;
            newElement.textContent = document.getElementById('attr-text-content').value;
        } else if (elementType === 'input') {
            newElement.type = document.getElementById('attr-type').value;
            newElement.value = document.getElementById('attr-value').value;
            newElement.placeholder = document.getElementById('attr-placeholder').value;
        }
        targetElement.appendChild(newElement);
        syncViews();

        hideAttributeDialog();
    });

    attributeCancelBtn.addEventListener('click', hideAttributeDialog);

    // --- CLIPPY HINT LISTENER ---
    clippyAssistant.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event from bubbling up
        console.log('Clippy Assistant clicked.');
        if (clippySpeechBubble.classList.contains('active')) {
            console.log('Clippy speech bubble is active, deactivating.');
            clippySpeechBubble.classList.remove('active');
        } else {
            console.log('Clippy speech bubble is inactive, activating.');
            // Show a random general hint when Clippy is activated
            const randomIndex = Math.floor(Math.random() * generalHints.length);
            clippyGeneralHintDisplay.textContent = generalHints[randomIndex];

            clippyHintText.classList.add('hidden'); // Hide default hint
            clippyTriviaDisplay.classList.add('hidden'); // Hide trivia
            clippyGeneralHintDisplay.classList.remove('hidden'); // Show general hint

            clippySpeechBubble.classList.add('active');
            console.log('--- After Clippy Assistant click (activating) ---');
            console.log('clippySpeechBubble display:', window.getComputedStyle(clippySpeechBubble).display);
            console.log('clippySpeechBubble classList:', clippySpeechBubble.classList.value);
            console.log('clippyHintText display:', window.getComputedStyle(clippyHintText).display);
            console.log('clippyHintText classList:', clippyHintText.classList.value);
            console.log('clippyTriviaDisplay display:', window.getComputedStyle(clippyTriviaDisplay).display);
            console.log('clippyTriviaDisplay classList:', clippyTriviaDisplay.classList.value);
            console.log('clippyGeneralHintDisplay display:', window.getComputedStyle(clippyGeneralHintDisplay).display);
            console.log('clippyGeneralHintDisplay classList:', clippyGeneralHintDisplay.classList.value);
        }
    });

    clippyTriviaButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event from bubbling up
        console.log('Clippy Trivia Button clicked.');
        const randomIndex = Math.floor(Math.random() * triviaFacts.length);
        clippyTriviaDisplay.textContent = triviaFacts[randomIndex];
        clippyTriviaDisplay.classList.remove('hidden'); // Show trivia
        clippyHintText.classList.add('hidden'); // Hide default hint
        clippyGeneralHintDisplay.classList.add('hidden'); // Hide general hint
        console.log('Displayed trivia:', clippyTriviaDisplay.textContent);
        console.log('clippyHintText hidden status:', clippyHintText.classList.contains('hidden'));
        console.log('clippyTriviaDisplay hidden status:', clippyTriviaDisplay.classList.contains('hidden'));
        console.log('clippyGeneralHintDisplay hidden status:', clippyGeneralHintDisplay.classList.contains('hidden'));
    });

    clippyGeneralHintButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event from bubbling up
        console.log('Clippy General Hint Button clicked.');
        const randomIndex = Math.floor(Math.random() * generalHints.length);
        clippyGeneralHintDisplay.textContent = generalHints[randomIndex];
        clippyGeneralHintDisplay.classList.remove('hidden'); // Show general hint
        clippyHintText.classList.add('hidden'); // Hide default hint
        clippyTriviaDisplay.classList.add('hidden'); // Hide trivia
        console.log('Displayed general hint:', clippyGeneralHintDisplay.textContent);
        console.log('clippyHintText hidden status:', clippyHintText.classList.contains('hidden'));
        console.log('clippyTriviaDisplay hidden status:', clippyTriviaDisplay.classList.contains('hidden'));
        console.log('clippyGeneralHintDisplay hidden status:', clippyGeneralHintDisplay.classList.contains('hidden'));
    });

    toggleClippyButton.addEventListener('click', () => {
        if (clippyAssistant.style.display === 'none') {
            clippyAssistant.style.display = 'block';
            localStorage.setItem('clippyVisibility', 'block');
        } else {
            clippyAssistant.style.display = 'none';
            localStorage.setItem('clippyVisibility', 'hidden');
            clippySpeechBubble.classList.remove('active'); // Hide speech bubble if Clippy is hidden
        }
    });
}); // Closing brace for DOMContentLoaded

function showInsertDialog() {
    insertDialogOverlay.style.display = 'block';
    dialogElementType.value = 'div'; // Default selection
}

function hideInsertDialog() {
    insertDialogOverlay.style.display = 'none';
}

function showAttributeDialog(elementType) {
    currentElementTypeForAttributeDialog = elementType;
    attributeFields.innerHTML = ''; // Clear previous fields
    attributeDialogTitle.innerHTML = `<img id="attribute-icon" class="custom-dialog-icon" src="input.png"> ${elementType === 'input' ? 'Input' : elementType}属性を設定`;

    // Set icon based on element type
    if (elementType === 'a') {
        attributeIcon.src = 'input.png'; // Using input.png for link settings as well
    } else if (elementType === 'input') {
        attributeIcon.src = 'input.png';
    }

    if (elementType === 'a') {
        attributeFields.innerHTML = `
            <div class="prop-item">
                <label for="attr-href">Href:</label>
                <input type="text" id="attr-href" value="#">
            </div>
            <div class="prop-item">
                <label for="attr-text-content">テキストコンテンツ:</label>
                <input type="text" id="attr-text-content" value="リンクテキスト">
            </div>
        `;
    } else if (elementType === 'input') {
        attributeFields.innerHTML = `
            <div class="prop-item">
                <label for="attr-type">タイプ:</label>
                <select id="attr-type">
                    <option value="text">テキスト</option>
                    <option value="password">パスワード</option>
                    <option value="number">数値</option>
                    <option value="checkbox">チェックボックス</option>
                    <option value="radio">ラジオ</option>
                    <option value="submit">送信</option>
                    <option value="button">ボタン</option>
                </select>
            </div>
            <div class="prop-item">
                <label for="attr-value">値:</label>
                <input type="text" id="attr-value">
            </div>
            <div class="prop-item">
                <label for="attr-placeholder">プレースホルダー:</label>
                <input type="text" id="attr-placeholder">
            </div>
        `;
    }
    attributeDialogOverlay.style.display = 'block';
}

function hideAttributeDialog() {
    attributeDialogOverlay.style.display = 'none';
}

// --- CUSTOM ALERT/PROMPT/CONFIRM FUNCTIONS ---
function customAlert(message, iconSrc = 'err.png') {
    return new Promise(resolve => {
        alertMessage.textContent = message;
        alertIcon.src = iconSrc;
        alertDialogOverlay.style.display = 'block';
        alertOkBtn.onclick = () => {
            alertDialogOverlay.style.display = 'none';
            resolve();
        };
    });
}

function customPrompt(message, defaultValue = '', iconSrc = 'input.png') {
    return new Promise(resolve => {
        promptMessage.textContent = message;
        promptInput.value = defaultValue;
        promptIcon.src = iconSrc;
        promptDialogOverlay.style.display = 'block';
        promptInput.focus();

        promptOkBtn.onclick = () => {
            promptDialogOverlay.style.display = 'none';
            resolve(promptInput.value);
        };
        promptCancelBtn.onclick = () => {
            promptDialogOverlay.style.display = 'none';
            resolve(null);
        };
    });
}

function customConfirm(message, iconSrc = 'warn.png') {
    return new Promise(resolve => {
        confirmMessage.textContent = message;
        confirmIcon.src = iconSrc;
        confirmDialogOverlay.style.display = 'block';

        confirmOkBtn.onclick = () => {
            confirmDialogOverlay.style.display = 'none';
            resolve(true);
        };
        confirmCancelBtn.onclick = () => {
            confirmDialogOverlay.style.display = 'none';
            resolve(false);
        };
    });
}

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

        if (selectedElement) {
            range.insertNode(newEl);
            range.setStartAfter(newEl);
            selection.removeAllRanges();
            selection.addRange(range);
        } else {
            doc.body.appendChild(newEl);
        }
        syncViews();
    };

    document.getElementById('insert-div').addEventListener('click', () => insertElement('div', '新しいDiv', { style: 'border: 1px solid black; padding: 5px; min-height: 1em;' }));
    document.getElementById('insert-span').addEventListener('click', () => insertElement('span', '新しいspan。'));
    document.getElementById('insert-header').addEventListener('click', () => insertElement('header', '<h1>ページヘッダー</h1>', { style: 'border: 1px solid #95B3D8; padding: 10px; background-color: #EAF2FB;' }));
    document.getElementById('insert-hr').addEventListener('click', () => insertElement('hr', null, { style: 'border-top: 1px solid #ccc; margin: 10px 0;' }));

    document.getElementById('insert-p').addEventListener('click', () => insertElement('p', '新しい段落。'));
    document.getElementById('insert-h1').addEventListener('click', () => insertElement('h1', '見出し 1'));
    document.getElementById('insert-h2').addEventListener('click', () => insertElement('h2', '見出し 2'));
    document.getElementById('insert-h3').addEventListener('click', () => insertElement('h3', '見出し 3'));
    document.getElementById('insert-a').addEventListener('click', () => {
        showAttributeDialog('a');
    });

    document.getElementById('insert-img').addEventListener('click', async () => {
        const url = await customPrompt('画像URLを入力してください:', 'https://via.placeholder.com/100');
        if (url) insertElement('img', null, { src: url, style: 'width: 100px;' });
    });

    document.getElementById('insert-ul').addEventListener('click', () => insertElement('ul', '<li>リスト項目</li>', { style: 'border: 1px dotted grey; padding: 20px;' }));
    document.getElementById('insert-ol').addEventListener('click', () => insertElement('ol', '<li>リスト項目</li>', { style: 'border: 1px dotted grey; padding: 20px;' }));
    document.getElementById('insert-li').addEventListener('click', () => insertElement('li', 'リスト項目'));

    document.getElementById('insert-input').addEventListener('click', () => {
        showAttributeDialog('input');
    });
    document.getElementById('insert-textarea').addEventListener('click', () => insertElement('textarea', '新しいテキストエリア'));
    document.getElementById('insert-select').addEventListener('click', () => insertElement('select', '<option>オプション 1</option><option>オプション 2</option>'));

    document.getElementById('insert-table').addEventListener('click', () => insertElement('table', '<tr><td>セル 1</td><td>セル 2</td></tr>', { border: '1px solid black', style: 'width: 100%; border-collapse: collapse;' }));
    document.getElementById('insert-tr').addEventListener('click', () => insertElement('tr', '新しいセル'));
    document.getElementById('insert-td').addEventListener('click', () => insertElement('td', '新しいセル'));
    document.getElementById('insert-th').addEventListener('click', () => insertElement('th', '新しいヘッダー'));

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

    document.getElementById('move-up').addEventListener('click', moveElementUp);
    document.getElementById('move-down').addEventListener('click', moveElementDown);
    document.getElementById('delete-element').addEventListener('click', deleteSelectedElement);
    document.getElementById('insert-into').addEventListener('click', insertIntoSelected);
}

function insertIntoSelected() {
    const targetElement = selectedElement || wysiwyg.contentDocument.body;
    const tagName = targetElement.tagName;
    if (tagName === 'DIV' || tagName === 'OL' || tagName === 'UL' || tagName === 'BODY') {
        showInsertDialog();
    } else {
        customAlert('DIV、OL、UL、またはBODY要素を選択して挿入してください。');
    }
}

function moveElementUp() {
    if (selectedElement && selectedElement.previousElementSibling) {
        selectedElement.parentNode.insertBefore(selectedElement, selectedElement.previousElementSibling);
        syncViews();
    }
}

function moveElementDown() {
    if (selectedElement && selectedElement.nextElementSibling) {
        selectedElement.parentNode.insertBefore(selectedElement.nextElementSibling, selectedElement);
        syncViews();
    }
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
        { type: 'group', label: '識別情報' },
        { label: 'ID', prop: 'id', type: 'text', value: selectedElement.id },
        { label: 'クラス', prop: 'className', type: 'text', value: selectedElement.className },
    ];

    // Add Text Content property only for elements that can have text
    const nonTextElements = ['IMG', 'INPUT', 'BR', 'HR']; // Add more as needed
    if (!nonTextElements.includes(selectedElement.tagName)) {
        propConfig.push(
            { type: 'group', label: 'コンテンツ' },
            { label: 'テキストコンテンツ', prop: 'textContent', type: 'textarea', value: selectedElement.textContent }
        );
    }

    propConfig.push(
        { type: 'group', label: 'テキスト' },
        { label: 'フォントファミリー', prop: 'fontFamily', type: 'select', options: ['Arial, sans-serif', 'Verdana, sans-serif', 'Tahoma, sans-serif', 'Trebuchet MS, sans-serif', 'Georgia, serif', 'Times New Roman, serif', 'Courier New, monospace', 'Lucida Console, monospace', 'Segoe UI, sans-serif'], value: computedStyle.fontFamily },
        { label: 'フォントサイズ', prop: 'fontSize', type: 'text', value: computedStyle.fontSize },
        { label: '色', prop: 'color', type: 'color', value: computedStyle.color },
        { type: 'group', label: '背景とボーダー' },
        { label: '背景色', prop: 'backgroundColor', type: 'color', value: computedStyle.backgroundColor },
        { label: '背景画像', prop: 'backgroundImage', type: 'text', value: computedStyle.backgroundImage },
        { label: '背景繰り返し', prop: 'backgroundRepeat', type: 'select', options: ['repeat', 'repeat-x', 'repeat-y', 'no-repeat'], value: computedStyle.backgroundRepeat },
        { label: '背景位置', prop: 'backgroundPosition', type: 'text', value: computedStyle.backgroundPosition },
        { label: '背景サイズ', prop: 'backgroundSize', type: 'text', value: computedStyle.backgroundSize },
        { label: 'ボーダー幅', prop: 'borderWidth', type: 'text', value: computedStyle.borderWidth },
        { label: 'ボーダースタイル', prop: 'borderStyle', type: 'select', options: ['none', 'solid', 'dotted', 'dashed'], value: computedStyle.borderStyle },
        { label: 'ボーダー色', prop: 'borderColor', type: 'color', value: computedStyle.borderColor },
        { label: 'ボーダー半径', prop: 'borderRadius', type: 'text', value: computedStyle.borderRadius },
        { type: 'group', label: 'レイアウト' },
        { label: 'マージン', prop: 'margin', type: 'text', value: computedStyle.margin },
        { label: 'パディング', prop: 'padding', type: 'text', value: computedStyle.padding },
        { type: 'group', label: 'Flexbox (コンテナ)' },
        { label: '表示', prop: 'display', type: 'select', options: ['block', 'inline-block', 'flex', 'grid', 'inline', 'none'], value: computedStyle.display },
        { label: 'Flex方向', prop: 'flexDirection', type: 'select', options: ['row', 'row-reverse', 'column', 'column-reverse'], value: computedStyle.flexDirection },
        { label: 'コンテンツ配置', prop: 'justifyContent', type: 'select', options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'], value: computedStyle.justifyContent },
        { label: 'アイテム配置', prop: 'alignItems', type: 'select', options: ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'], value: computedStyle.alignItems },
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
            このページはXPress Pageで作成されました。 <a href="https://dreeam00.github.io/XPressPage" target="_blank" style="color: #0078D7; text-decoration: none;">詳細はこちら</a>
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
                width: 300px;
                height: auto;
                border: none;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                border-radius: 5px;
            ">
        </a>
    `;
    htmlContent += bottomLeftBannerHtml;

    // Prepend the meta charset tag and wrap the content in a full HTML structure
    const finalHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>XPress Page Export</title>
</head>
<body>
${htmlContent}
</body>
</html>`;

    const blob = new Blob([finalHtml], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'index.html'; // Default filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href); // Clean up the URL object
}
