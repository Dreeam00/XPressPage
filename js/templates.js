const templates = [
    {
        name: "シンプルなヘッダー",
        description: "ロゴとナビゲーションリンクを含む基本的なヘッダー。",
        isDefault: true,
        html: `
            <header style="background-color: #f8f8f8; padding: 15px 20px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
                <div style="font-size: 24px; font-weight: bold; color: #333;">ロゴ</div>
                <nav>
                    <a href="#" style="margin-left: 20px; text-decoration: none; color: #007bff;">ホーム</a>
                    <a href="#" style="margin-left: 20px; text-decoration: none; color: #007bff;">サービス</a>
                    <a href="#" style="margin-left: 20px; text-decoration: none; color: #007bff;">お問い合わせ</a>
                </nav>
            </header>
        `
    },
    {
        name: "2カラムセクション",
        description: "画像とテキストコンテンツを含む2カラムレイアウト。",
        isDefault: true,
        html: `
            <section style="display: flex; padding: 40px 20px; gap: 20px; align-items: center;">
                <div style="flex: 1; text-align: center;">
                    <img src="https://via.placeholder.com/300x200" alt="Placeholder Image" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                </div>
                <div style="flex: 1;">
                    <h2 style="color: #333; font-size: 28px; margin-bottom: 15px;">セクションタイトル</h2>
                    <p style="color: #555; line-height: 1.7;">
                        ここにセクションのテキストコンテンツが入ります。このテキストは、製品やサービス、または伝えたいメッセージについて説明するために使用できます。
                        より多くの情報を追加して、訪問者の興味を引くことができます。
                    </p>
                    <button style="background-color: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; margin-top: 20px;">詳細を見る</button>
                </div>
            </section>
        `
    },
    {
        name: "ヒーローセクション",
        description: "大きな見出しと行動を促すボタンを備えた目立つセクション。",
        isDefault: true,
        html: `
            <section style="background: linear-gradient(to right, #6dd5ed, #2193b0); color: white; text-align: center; padding: 80px 20px;">
                <h1 style="font-size: 48px; margin-bottom: 20px;">あなたのアイデアを現実に</h1>
                <p style="font-size: 20px; margin-bottom: 30px; line-height: 1.6;">
                    XPress Pageを使えば、プロフェッショナルなウェブサイトを簡単に作成できます。
                    コーディングの知識は必要ありません。
                </p>
                <button style="background-color: #ffc107; color: #333; padding: 15px 30px; border: none; border-radius: 5px; font-size: 20px; cursor: pointer; font-weight: bold;">今すぐ始める</button>
            </section>
        `
    },
    {
        name: "フッター",
        description: "著作権情報とソーシャルメディアリンクを含むシンプルなフッター。",
        isDefault: true,
        html: `
            <footer style="background-color: #333; color: white; text-align: center; padding: 30px 20px; font-size: 14px;">
                <p>&copy; 2025 XPress Page. All rights reserved.</p>
                <div style="margin-top: 15px;">
                    <a href="#" style="color: white; text-decoration: none; margin: 0 10px;">Facebook</a>
                    <a href="#" style="color: white; text-decoration: none; margin: 0 10px;">Twitter</a>
                    <a href="#" style="color: white; text-decoration: none; margin: 0 10px;">LinkedIn</a>
                </div>
            </footer>
        `
    },
    {
        name: "特徴セクション",
        description: "製品やサービスの主要な特徴をアイコンと説明で紹介。",
        isDefault: true,
        html: `
            <section style="padding: 60px 20px; background-color: #f9f9f9; text-align: center;">
                <h2 style="font-size: 36px; color: #333; margin-bottom: 40px;">私たちの特徴</h2>
                <div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;">
                    <div style="flex-basis: 280px; padding: 25px; background-color: white; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.08);">
                        <img src="https://via.placeholder.com/60" alt="Feature Icon 1" style="margin-bottom: 20px;">
                        <h3 style="font-size: 22px; color: #007bff; margin-bottom: 10px;">高速パフォーマンス</h3>
                        <p style="color: #666; line-height: 1.6;">最適化されたコードとインフラで、驚くほど速いウェブサイトを実現します。</p>
                    </div>
                    <div style="flex-basis: 280px; padding: 25px; background-color: white; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.08);">
                        <img src="https://via.placeholder.com/60" alt="Feature Icon 2" style="margin-bottom: 20px;">
                        <h3 style="font-size: 22px; color: #007bff; margin-bottom: 10px;">簡単な操作性</h3>
                        <p style="color: #666; line-height: 1.6;">直感的なインターフェースで、誰でも簡単にウェブページを作成・編集できます。</p>
                    </div>
                    <div style="flex-basis: 280px; padding: 25px; background-color: white; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.08);">
                        <img src="https://via.placeholder.com/60" alt="Feature Icon 3" style="margin-bottom: 20px;">
                        <h3 style="font-size: 22px; color: #007bff; margin-bottom: 10px;">高い拡張性</h3>
                        <p style="color: #666; line-height: 1.6;">将来のニーズに合わせて、いつでも機能を追加・拡張できます。</p>
                    </div>
                </div>
            </section>
        `
    },
    {
        name: "お客様の声セクション",
        description: "顧客からの肯定的なフィードバックを紹介するセクション。",
        isDefault: true,
        html: `
            <section style="background-color: #eef7ff; padding: 60px 20px; text-align: center;">
                <h2 style="font-size: 36px; color: #333; margin-bottom: 40px;">お客様の声</h2>
                <div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;">
                    <div style="flex-basis: 320px; padding: 30px; background-color: white; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.08); text-align: left;">
                        <p style="font-style: italic; color: #555; margin-bottom: 20px; line-height: 1.7;">"XPress Pageは、私のビジネスに革命をもたらしました。以前は数日かかっていたウェブサイトの更新が、今では数分で完了します！"</p>
                        <div style="display: flex; align-items: center;">
                            <img src="https://via.placeholder.com/50" alt="Client Photo 1" style="border-radius: 50%; margin-right: 15px;">
                            <div>
                                <p style="font-weight: bold; color: #333; margin: 0;">田中 太郎</p>
                                <p style="font-size: 14px; color: #777; margin: 0;">ABC株式会社 CEO</p>
                            </div>
                        </div>
                    </div>
                    <div style="flex-basis: 320px; padding: 30px; background-color: white; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.08); text-align: left;">
                        <p style="font-style: italic; color: #555; margin-bottom: 20px; line-height: 1.7;">"使いやすさに感動しました。デザインの知識がなくても、プロフェッショナルなページが作れるなんて信じられません！サポートも素晴らしいです。"</p>
                        <div style="display: flex; align-items: center;">
                            <img src="https://via.placeholder.com/50" alt="Client Photo 2" style="border-radius: 50%; margin-right: 15px;">
                            <div>
                                <p style="font-weight: bold; color: #333; margin: 0;">鈴木 花子</p>
                                <p style="font-size: 14px; color: #777; margin: 0;">ウェブデザイナー</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `
    },
    {
        name: "行動喚起 (CTA)",
        description: "訪問者に特定のアクションを促すためのセクション。",
        isDefault: true,
        html: `
            <section style="background-color: #007bff; color: white; text-align: center; padding: 50px 20px;">
                <h2 style="font-size: 32px; margin-bottom: 20px;">今すぐXPress Pageを体験しよう！</h2>
                <p style="font-size: 18px; margin-bottom: 30px;">あなたの次の素晴らしいウェブサイトを、今日から構築し始めましょう。</p>
                <button style="background-color: #28a745; color: white; padding: 15px 30px; border: none; border-radius: 5px; font-size: 20px; cursor: pointer; font-weight: bold;">無料トライアルを開始</button>
            </section>
        `
    },
    {
        name: "料金表",
        description: "異なるプランの価格と特徴を比較する表形式のセクション。",
        isDefault: true,
        html: `
            <section style="padding: 60px 20px; background-color: #f0f2f5; text-align: center;">
                <h2 style="font-size: 36px; color: #333; margin-bottom: 40px;">料金プラン</h2>
                <div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;">
                    <div style="flex-basis: 300px; background-color: white; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.08); padding: 30px; display: flex; flex-direction: column;">
                        <h3 style="font-size: 24px; color: #007bff; margin-bottom: 15px;">ベーシック</h3>
                        <p style="font-size: 48px; font-weight: bold; color: #333; margin-bottom: 20px;">$9<span style="font-size: 18px; font-weight: normal;">/月</span></p>
                        <ul style="list-style: none; padding: 0; margin-bottom: 30px; flex-grow: 1;">
                            <li style="margin-bottom: 10px; color: #555;">✓ 1ウェブサイト</li>
                            <li style="margin-bottom: 10px; color: #555;">✓ 10GBストレージ</li>
                            <li style="margin-bottom: 10px; color: #555;">✓ 基本サポート</li>
                        </ul>
                        <button style="background-color: #007bff; color: white; padding: 12px 25px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">選択する</button>
                    </div>
                    <div style="flex-basis: 300px; background-color: white; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.08); padding: 30px; display: flex; flex-direction: column; border: 2px solid #007bff;">
                        <h3 style="font-size: 24px; color: #007bff; margin-bottom: 15px;">プロフェッショナル</h3>
                        <p style="font-size: 48px; font-weight: bold; color: #333; margin-bottom: 20px;">$29<span style="font-size: 18px; font-weight: normal;">/月</span></p>
                        <ul style="list-style: none; padding: 0; margin-bottom: 30px; flex-grow: 1;">
                            <li style="margin-bottom: 10px; color: #555;">✓ 5ウェブサイト</li>
                            <li style="margin-bottom: 10px; color: #555;">✓ 100GBストレージ</li>
                            <li style="margin-bottom: 10px; color: #555;">✓ 優先サポート</li>
                            <li style="margin-bottom: 10px; color: #555;">✓ 全テンプレートアクセス</li>
                        </ul>
                        <button style="background-color: #007bff; color: white; padding: 12px 25px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">選択する</button>
                    </div>
                    <div style="flex-basis: 300px; background-color: white; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.08); padding: 30px; display: flex; flex-direction: column;">
                        <h3 style="font-size: 24px; color: #007bff; margin-bottom: 15px;">エンタープライズ</h3>
                        <p style="font-size: 48px; font-weight: bold; color: #333; margin-bottom: 20px;">$99<span style="font-size: 18px; font-weight: normal;">/月</span></p>
                        <ul style="list-style: none; padding: 0; margin-bottom: 30px; flex-grow: 1;">
                            <li style="margin-bottom: 10px; color: #555;">✓ 無制限ウェブサイト</li>
                            <li style="margin-bottom: 10px; color: #555;">✓ 無制限ストレージ</li>
                            <li style="margin-bottom: 10px; color: #555;">✓ 24/7専任サポート</li>
                            <li style="margin-bottom: 10px; color: #555;">✓ カスタム開発</li>
                        </ul>
                        <button style="background-color: #007bff; color: white; padding: 12px 25px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">選択する</button>
                    </div>
                </div>
            </section>
        `
    },
    {
        name: "お問い合わせフォーム",
        description: "基本的な連絡先情報収集のためのフォーム。",
        isDefault: true,
        html: `
            <section style="padding: 60px 20px; background-color: #f0f8ff;">
                <h2 style="text-align: center; font-size: 36px; color: #333; margin-bottom: 40px;">お問い合わせ</h2>
                <div style="max-width: 600px; margin: 0 auto; padding: 30px; background-color: white; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.08);">
                    <form>
                        <div style="margin-bottom: 20px;">
                            <label for="contact-name" style="display: block; font-weight: bold; margin-bottom: 8px; color: #555;">お名前:</label>
                            <input type="text" id="contact-name" name="name" style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 5px; font-size: 16px;" placeholder="お名前を入力してください">
                        </div>
                        <div style="margin-bottom: 20px;">
                            <label for="contact-email" style="display: block; font-weight: bold; margin-bottom: 8px; color: #555;">メールアドレス:</label>
                            <input type="email" id="contact-email" name="email" style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 5px; font-size: 16px;" placeholder="メールアドレスを入力してください">
                        </div>
                        <div style="margin-bottom: 20px;">
                            <label for="contact-message" style="display: block; font-weight: bold; margin-bottom: 8px; color: #555;">メッセージ:</label>
                            <textarea id="contact-message" name="message" rows="6" style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 5px; font-size: 16px;" placeholder="メッセージを入力してください"></textarea>
                        </div>
                        <button type="submit" style="background-color: #007bff; color: white; padding: 15px 30px; border: none; border-radius: 5px; font-size: 18px; cursor: pointer; width: 100%;">送信</button>
                    </form>
                </div>
            </section>
        `
    },
    {
        name: "画像ギャラリー",
        description: "レスポンシブな画像グリッドギャラリー。",
        isDefault: true,
        html: `
            <section style="padding: 60px 20px; background-color: #fdfdfd;">
                <h2 style="text-align: center; font-size: 36px; color: #333; margin-bottom: 40px;">ギャラリー</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; max-width: 1200px; margin: 0 auto;">
                    <div style="border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                        <img src="https://via.placeholder.com/400x300" alt="Gallery Image 1" style="width: 100%; height: 200px; object-fit: cover; display: block;">
                        <div style="padding: 15px; background-color: white;">
                            <h3 style="font-size: 20px; color: #333; margin-bottom: 5px;">画像のタイトル 1</h3>
                            <p style="font-size: 14px; color: #777;">短い説明文がここに入ります。</p>
                        </div>
                    </div>
                    <div style="border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                        <img src="https://via.placeholder.com/400x300" alt="Gallery Image 2" style="width: 100%; height: 200px; object-fit: cover; display: block;">
                        <div style="padding: 15px; background-color: white;">
                            <h3 style="font-size: 20px; color: #333; margin-bottom: 5px;">画像のタイトル 2</h3>
                            <p style="font-size: 14px; color: #777;">短い説明文がここに入ります。</p>
                        </div>
                    </div>
                    <div style="border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                        <img src="https://via.placeholder.com/400x300" alt="Gallery Image 3" style="width: 100%; height: 200px; object-fit: cover; display: block;">
                        <div style="padding: 15px; background-color: white;">
                            <h3 style="font-size: 20px; color: #333; margin-bottom: 5px;">画像のタイトル 3</h3>
                            <p style="font-size: 14px; color: #777;">短い説明文がここに入ります。</p>
                        </div>
                    </div>
                    <div style="border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                        <img src="https://via.placeholder.com/400x300" alt="Gallery Image 4" style="width: 100%; height: 200px; object-fit: cover; display: block;">
                        <div style="padding: 15px; background-color: white;">
                            <h3 style="font-size: 20px; color: #333; margin-bottom: 5px;">画像のタイトル 4</h3>
                            <p style="font-size: 14px; color: #777;">短い説明文がここに入ります。</p>
                        </div>
                    </div>
                </div>
            </section>
        `
    },
    {
        name: "チームセクション",
        description: "チームメンバーの紹介。",
        isDefault: true,
        html: `
            <section style="padding: 60px 20px; background-color: #f9f9f9; text-align: center;">
                <h2 style="font-size: 36px; color: #333; margin-bottom: 40px;">私たちのチーム</h2>
                <div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;">
                    <div style="flex-basis: 250px; padding: 20px; background-color: white; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.08);">
                        <img src="https://via.placeholder.com/150" alt="Team Member 1" style="border-radius: 50%; margin-bottom: 15px; width: 150px; height: 150px; object-fit: cover;">
                        <h3 style="font-size: 22px; color: #333; margin-bottom: 5px;">山田 太郎</h3>
                        <p style="font-size: 16px; color: #007bff; margin-bottom: 10px;">CEO</p>
                        <p style="font-size: 14px; color: #666;">会社のビジョンを牽引するリーダー。</p>
                    </div>
                    <div style="flex-basis: 250px; padding: 20px; background-color: white; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.08);">
                        <img src="https://via.placeholder.com/150" alt="Team Member 2" style="border-radius: 50%; margin-bottom: 15px; width: 150px; height: 150px; object-fit: cover;">
                        <h3 style="font-size: 22px; color: #333; margin-bottom: 5px;">佐藤 花子</h3>
                        <p style="font-size: 16px; color: #007bff; margin-bottom: 10px;">リードデザイナー</p>
                        <p style="font-size: 14px; color: #666;">ユーザー体験を形にするクリエイティブな頭脳。</p>
                    </div>
                    <div style="flex-basis: 250px; padding: 20px; background-color: white; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.08);">
                        <img src="https://via.placeholder.com/150" alt="Team Member 3" style="border-radius: 50%; margin-bottom: 15px; width: 150px; height: 150px; object-fit: cover;">
                        <h3 style="font-size: 22px; color: #333; margin-bottom: 5px;">鈴木 健太</h3>
                        <p style="font-size: 16px; color: #007bff; margin-bottom: 10px;">主任エンジニア</p>
                        <p style="font-size: 14px; color: #666;">革新的な技術で製品を支えるエンジニア。</p>
                    </div>
                </div>
            </section>
        `
    },
    {
        name: "FAQセクション",
        description: "よくある質問とその回答。",
        isDefault: true,
        html: `
            <section style="padding: 60px 20px; background-color: #eef7ff;">
                <h2 style="text-align: center; font-size: 36px; color: #333; margin-bottom: 40px;">よくある質問</h2>
                <div style="max-width: 800px; margin: 0 auto;">
                    <div style="background-color: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); margin-bottom: 20px; padding: 25px;">
                        <h3 style="font-size: 20px; color: #007bff; margin-bottom: 10px;">Q: XPress Pageとは何ですか？</h3>
                        <p style="color: #555; line-height: 1.6;">A: XPress Pageは、直感的なドラッグ＆ドロップインターフェースで、コーディング知識なしにプロフェッショナルなウェブページを作成できるツールです。</p>
                    </div>
                    <div style="background-color: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); margin-bottom: 20px; padding: 25px;">
                        <h3 style="font-size: 20px; color: #007bff; margin-bottom: 10px;">Q: 無料で利用できますか？</h3>
                        <p style="color: #555; line-height: 1.6;">A: はい、基本的な機能は無料でご利用いただけます。より高度な機能やテンプレートは有料プランで提供しています。</p>
                    </div>
                    <div style="background-color: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); margin-bottom: 20px; padding: 25px;">
                        <h3 style="font-size: 20px; color: #007bff; margin-bottom: 10px;">Q: 作成したページはどのように公開しますか？</h3>
                        <p style="color: #555; line-height: 1.6;">A: 作成したページはHTMLファイルとしてエクスポートできます。ご自身のウェブサーバーにアップロードして公開してください。</p>
                    </div>
                </div>
            </section>
        `
    },
    {
        name: "お問い合わせフォーム",
        description: "基本的な連絡先情報収集のためのフォーム。",
        isDefault: true,
        html: `
            <section style="padding: 60px 20px; background-color: #f0f8ff;">
                <h2 style="text-align: center; font-size: 36px; color: #333; margin-bottom: 40px;">お問い合わせ</h2>
                <div style="max-width: 600px; margin: 0 auto; padding: 30px; background-color: white; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.08);">
                    <form>
                        <div style="margin-bottom: 20px;">
                            <label for="contact-name" style="display: block; font-weight: bold; margin-bottom: 8px; color: #555;">お名前:</label>
                            <input type="text" id="contact-name" name="name" style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 5px; font-size: 16px;" placeholder="お名前を入力してください">
                        </div>
                        <div style="margin-bottom: 20px;">
                            <label for="contact-email" style="display: block; font-weight: bold; margin-bottom: 8px; color: #555;">メールアドレス:</label>
                            <input type="email" id="contact-email" name="email" style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 5px; font-size: 16px;" placeholder="メールアドレスを入力してください">
                        </div>
                        <div style="margin-bottom: 20px;">
                            <label for="contact-message" style="display: block; font-weight: bold; margin-bottom: 8px; color: #555;">メッセージ:</label>
                            <textarea id="contact-message" name="message" rows="6" style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 5px; font-size: 16px;" placeholder="メッセージを入力してください"></textarea>
                        </div>
                        <button type="submit" style="background-color: #007bff; color: white; padding: 15px 30px; border: none; border-radius: 5px; font-size: 18px; cursor: pointer; width: 100%;">送信</button>
                    </form>
                </div>
            </section>
        `
    },
    {
        name: "画像ギャラリー",
        description: "レスポンシブな画像グリッドギャラリー。",
        isDefault: true,
        html: `
            <section style="padding: 60px 20px; background-color: #fdfdfd;">
                <h2 style="text-align: center; font-size: 36px; color: #333; margin-bottom: 40px;">ギャラリー</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; max-width: 1200px; margin: 0 auto;">
                    <div style="border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                        <img src="https://via.placeholder.com/400x300" alt="Gallery Image 1" style="width: 100%; height: 200px; object-fit: cover; display: block;">
                        <div style="padding: 15px; background-color: white;">
                            <h3 style="font-size: 20px; color: #333; margin-bottom: 5px;">画像のタイトル 1</h3>
                            <p style="font-size: 14px; color: #777;">短い説明文がここに入ります。</p>
                        </div>
                    </div>
                    <div style="border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                        <img src="https://via.placeholder.com/400x300" alt="Gallery Image 2" style="width: 100%; height: 200px; object-fit: cover; display: block;">
                        <div style="padding: 15px; background-color: white;">
                            <h3 style="font-size: 20px; color: #333; margin-bottom: 5px;">画像のタイトル 2</h3>
                            <p style="font-size: 14px; color: #777;">短い説明文がここに入ります。</p>
                        </div>
                    </div>
                    <div style="border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                        <img src="https://via.placeholder.com/400x300" alt="Gallery Image 3" style="width: 100%; height: 200px; object-fit: cover; display: block;">
                        <div style="padding: 15px; background-color: white;">
                            <h3 style="font-size: 20px; color: #333; margin-bottom: 5px;">画像のタイトル 3</h3>
                            <p style="font-size: 14px; color: #777;">短い説明文がここに入ります。</p>
                        </div>
                    </div>
                    <div style="border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                        <img src="https://via.placeholder.com/400x300" alt="Gallery Image 4" style="width: 100%; height: 200px; object-fit: cover; display: block;">
                        <div style="padding: 15px; background-color: white;">
                            <h3 style="font-size: 20px; color: #333; margin-bottom: 5px;">画像のタイトル 4</h3>
                            <p style="font-size: 14px; color: #777;">短い説明文がここに入ります。</p>
                        </div>
                    </div>
                </div>
            </section>
        `
    },
    {
        name: "チームセクション",
        description: "チームメンバーの紹介。",
        isDefault: true,
        html: `
            <section style="padding: 60px 20px; background-color: #f9f9f9; text-align: center;">
                <h2 style="font-size: 36px; color: #333; margin-bottom: 40px;">私たちのチーム</h2>
                <div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;">
                    <div style="flex-basis: 250px; padding: 20px; background-color: white; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.08);">
                        <img src="https://via.placeholder.com/150" alt="Team Member 1" style="border-radius: 50%; margin-bottom: 15px; width: 150px; height: 150px; object-fit: cover;">
                        <h3 style="font-size: 22px; color: #333; margin-bottom: 5px;">山田 太郎</h3>
                        <p style="font-size: 16px; color: #007bff; margin-bottom: 10px;">CEO</p>
                        <p style="font-size: 14px; color: #666;">会社のビジョンを牽引するリーダー。</p>
                    </div>
                    <div style="flex-basis: 250px; padding: 20px; background-color: white; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.08);">
                        <img src="https://via.placeholder.com/150" alt="Team Member 2" style="border-radius: 50%; margin-bottom: 15px; width: 150px; height: 150px; object-fit: cover;">
                        <h3 style="font-size: 22px; color: #333; margin-bottom: 5px;">佐藤 花子</h3>
                        <p style="font-size: 16px; color: #007bff; margin-bottom: 10px;">リードデザイナー</p>
                        <p style="font-size: 14px; color: #666;">ユーザー体験を形にするクリエイティブな頭脳。</p>
                    </div>
                    <div style="flex-basis: 250px; padding: 20px; background-color: white; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.08);">
                        <img src="https://via.placeholder.com/150" alt="Team Member 3" style="border-radius: 50%; margin-bottom: 15px; width: 150px; height: 150px; object-fit: cover;">
                        <h3 style="font-size: 22px; color: #333; margin-bottom: 5px;">鈴木 健太</h3>
                        <p style="font-size: 16px; color: #007bff; margin-bottom: 10px;">主任エンジニア</p>
                        <p style="font-size: 14px; color: #666;">革新的な技術で製品を支えるエンジニア。</p>
                    </div>
                </div>
            </section>
        `
    },
    {
        name: "FAQセクション",
        description: "よくある質問とその回答。",
        isDefault: true,
        html: `
            <section style="padding: 60px 20px; background-color: #eef7ff;">
                <h2 style="text-align: center; font-size: 36px; color: #333; margin-bottom: 40px;">よくある質問</h2>
                <div style="max-width: 800px; margin: 0 auto;">
                    <div style="background-color: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); margin-bottom: 20px; padding: 25px;">
                        <h3 style="font-size: 20px; color: #007bff; margin-bottom: 10px;">Q: XPress Pageとは何ですか？</h3>
                        <p style="color: #555; line-height: 1.6;">A: XPress Pageは、直感的なドラッグ＆ドロップインターフェースで、コーディング知識なしにプロフェッショナルなウェブページを作成できるツールです。</p>
                    </div>
                    <div style="background-color: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); margin-bottom: 20px; padding: 25px;">
                        <h3 style="font-size: 20px; color: #007bff; margin-bottom: 10px;">Q: 無料で利用できますか？</h3>
                        <p style="color: #555; line-height: 1.6;">A: はい、基本的な機能は無料でご利用いただけます。より高度な機能やテンプレートは有料プランで提供しています。</p>
                    </div>
                    <div style="background-color: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); margin-bottom: 20px; padding: 25px;">
                        <h3 style="font-size: 20px; color: #007bff; margin-bottom: 10px;">Q: 作成したページはどのように公開しますか？</h3>
                        <p style="color: #555; line-height: 1.6;">A: 作成したページはHTMLファイルとしてエクスポートできます。ご自身のウェブサーバーにアップロードして公開してください。</p>
                    </div>
                </div>
            </section>
        `
    }
];