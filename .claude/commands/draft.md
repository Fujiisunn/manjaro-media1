---
description: mond に届いたマンジャロ関連質問から「7割の mond 返信案」+「100%の記事」をワンセットで生成する
argument-hint: <mond の質問本文 + 任意の補足>
---

# mond 質問 → mond 返信 + メディア記事 生成

ユーザーから渡された質問/指示: $ARGUMENTS

## このコマンドの目的

mond(質問箱アプリ)に届いたマンジャロ関連質問に対し、**ユーザーの代わりに 2 つの出力を一度に作る**:

- **(A) mond 返信案(完成度 7 割)**: mond 上にユーザー本人が投稿する、私目線・端的な返信。**意図的に 7 割にとどめ、残り 3 割は記事へ誘導**する(メディア導線設計)
- **(B) メディア記事(完成度 10 割)**: マンジャロメディア#1 に掲載する完成記事。`src/content/articles/<slug>.md` に `draft: true` で書き出す

> **重要:** (A) と (B) はワンセット。(B) を先に組み立て、その slug/構成を踏まえて (A) を作ると整合する。

## 出力フォーマット

最終的に以下を順に出す:

1. **記事ファイルを Write で書き出す**(slug は内容を反映した英数+ハイフン)
2. **会話に出す内容:**
   - 確定タイトル
   - mond 返信案(コードブロックでそのままコピペ可能に)
   - 記事プレビュー URL: `https://fujiisunn.github.io/manjaro-media1/preview/<slug>/`
   - 「push が必要」の案内

## 文体の全体ルール([[memory: feedback-no-ai-tells]])

(A)/(B) どちらも適用:

- **エムダッシュ「——」「――」「—」 禁止** : AI 生成の典型サイン。句点「。」やコロン「:」、別の繋ぎ語で置き換える
- 「結論からお伝えすると、」「○○について整理しました」のような硬い導入・AI 定型句 NG
- 「いかがでしたでしょうか」「ぜひ参考にしてください」のような締め文 NG

生成後に「——」「—」が混入してないか自分で確認すること。

## 共通: 質問の解釈

- 質問者属性(性別/年代/服用状況)が読み取れるなら、口調・温度感に反映
- 質問の本音(不安・困りごと)を 1 文で言語化してから書き始める

## 質問の採否判定([[memory: feedback-content-funnel]])

タイトル提案の **前に** 必ず判定。NG なら理由を返してスキップ:

> 「この記事を読了した読者は、引き続きマンジャロを選びたくなるか?」

- **OK 例:** 副作用の付き合い方、用量調整、食事・生活との合わせ方、効果推移、他薬比較でマンジャロ優位
- **NG 例:** メトホルミン等への切替効果、マンジャロ離脱前提の代替手段、マンジャロ否定に着地するテーマ

導線が切れる質問は、どんなに SEO がおいしくても採用しない。ただしコンプライアンス維持(マンジャロ礼賛・効能効果断定は NG)。あくまで「不安を解消し継続を選びやすくする」中立寄りの構成。

---

## (A) mond 返信案 / 7 割設計

### スタイル

- **私目線**(ユーザー本人として書く)。「〜だよ」「〜だと思う」などの口語フランクさは質問に合わせて
- **端的に**(目安 200〜350 字)。長文NG、結論先出し
- 医師じゃないので断定は避ける(「私は〜の経験/理解では」)
- 絵文字は使わない(mond の文体に合わせて)

### 構成テンプレ(柔軟調整可)

1. 質問への共感/受け止め(1 文)
2. 結論またはざっくり方針(2〜3 文)
3. **3 割を残す:** 詳細・根拠・対処手順・症例など、答えきらない部分を明示しつつ記事に誘導
4. CTA: 「詳しくは記事にまとめたので、よかったらどうぞ → <記事URL>」のような自然な誘導文

### CTA の URL

`https://fujiisunn.github.io/manjaro-media1/articles/<slug>/` を入れる。
**※プレビュー URL ではなく公開 URL を貼る**(公開後に踏まれる前提)。記事は draft: true でまだ公開されていないので、CTA 用は「公開時点で有効になる URL」として扱う。ユーザーが draft を外して公開した瞬間からリンクが生きる。

### CTA のトーン

押し付けがましくない、緩い紹介スタイル:

> 「ちなみにこんな記事あったのでよければ参考に!! → <URL>」

- 「絶対読んで」「必見」NG
- 「自分が書いた」感を出さない(「こんな記事あった」=第三者紹介ぽさ)
- 1 文で軽く添える程度

### 例

```
質問ありがとうございます!動悸はマンジャロのあるあるの一つで、私の周りでも増量直後に
出る人がけっこういます。ざっくり言うと、安静と水分でだいたい落ち着くケースが多い印象。
ただ「胸痛・息切れ」を伴うときは別物なので、そこの見極めは知っておいた方がよさそう。
ちなみにこんな記事あったのでよければ参考に!! → https://fujiisunn.github.io/manjaro-media1/articles/manjaro-palpitations/
```

---

## (B) メディア記事 / 10 割設計

### コンプライアンス([[memory: feedback-compliance]] [[memory: project-persona]])

- 「医師目線」「医師が解説」「医師監修」NG(個人運営/監修なし)
- 媒体側として効能効果や安全性を断定しない(「○○が治る」「絶対安全」NG)
- 医療情報は **出典付き** で(「添付文書では」「メーカー(Eli Lilly Japan)公表情報」「臨床試験では」など)
- 記事末尾に `<blockquote>` 免責文必須

### タイトル([[memory: feedback-article-style]])

- **タイトルは壁打ち**: 2〜3 案を最初に提示してユーザーに選んでもらう/修正してもらう
- スタイル: フック型・読点(、。!?)区切り・「要注意」「サイン」など軽いフック語
- 例: 「マンジャロ服用中の激しい動悸は要注意サイン!?副作用と緩和ケア」

### SEO の網

- 症状系記事には「○○の対処法|マンジャロ服用以外でも役立つ N 選」のような **薬剤非依存の一般対処法セクション** を 1 つ以上必ず入れる

### フロントマター(固定)

```yaml
---
title: <タイトル>
description: <120-160 字。検索クエリを意識した自然な紹介文>
pubDate: <今日の日付 YYYY-MM-DD>
category: マンジャロ
draft: true
thumb: articles/<slug>.png  # 画像未配置でも frontmatter には書く
---
```

### 使えるレイアウト primitives

```
<mark>キーフレーズ</mark>                       : 蛍光ハイライト
<nav class="toc"><div class="toc__title">目次</div> 1. [...] </nav>  : 目次
<div class="note">…</div>                       : info ノート
<div class="note note--warn">…</div>            : 警告ノート
<div class="note note--info">…</div>            : TIP ノート
<div class="box">
  <div class="box__title">ラベル</div>
  <div class="box__body">本文</div>
</div>                                          : ラベル付き枠
<blockquote>…</blockquote>                      : 免責・引用
| ヘッダ | … |                                  : テーブル
## / ### / ####                                 : H2(緑バンド) / H3(左アクセント) / H4
```

**重要:** HTML タグ内に Markdown を書くときは前後に空行が必要(CommonMark 仕様)。

### 推奨構成(症状記事 / 質問が「対処法系」の場合)

1. リード文(質問者の悩みを言語化 + 結論先出し + 本記事の案内)
2. 目次 `<nav class="toc">`
3. 要注意サイン `note--warn`(危険サイン早出し)
4. すぐできる一般的対処法 N 選(SEO の網)
5. マンジャロ視点の解説(添付文書・臨床試験出典)
6. **MID アセット(比較表)** — 記事中盤、文脈が自然な位置に。**誘導文ナシで単独で置く**(アセット自体が広告)
7. 医師に伝える記録ポイント `box`
8. Q&A
9. まとめ `box`
10. **END ブロック([[memory: feedback-article-closing]])**:
    - 誘導文 intro(`<p class="closing-lead">`)
    - 比較表アセット(`<div class="clinic-compare">`)
    - 誘導文 outro(`<p class="closing-outro">`)
11. 末尾ディスクレーマー `<blockquote>`

### 比較表アセットの HTML テンプレ

```html
<div class="clinic-compare" data-position="...">
<div class="clinic-compare__title">マンジャロ 2.5mg / 1ヶ月 価格比較</div>
<table>
<thead>
<tr><th>クリニック</th><th>2.5mg / 1ヶ月</th></tr>
</thead>
<tbody>
<tr class="clinic-compare__highlight">
<td><strong>DMM オンラインクリニック</strong><span class="clinic-compare__badge"><span class="clinic-compare__badge-pre">クーポン適用前</span><span class="clinic-compare__badge-post">クーポン適用後</span></span></td>
<td><span class="clinic-compare__original">¥17,100</span><span class="clinic-compare__discounted">¥14,800</span></td>
</tr>
<tr><td>クリニックフォア</td><td>¥18,800</td></tr>
<tr><td>イースト駅前クリニック</td><td>¥21,100</td></tr>
</tbody>
</table>
<a class="clinic-compare__apply" href="https://clinic.dmm.com/appointment?subject_name=%E5%A5%B3%E6%80%A7%E3%83%A1%E3%83%87%E3%82%A3%E3%82%AB%E3%83%AB%E3%83%80%E3%82%A4%E3%82%A8%E3%83%83%E3%83%88%E3%83%BB%E8%82%A5%E6%BA%80%E7%97%87&coupon_code=diman161003v&squadbeyond_uid=f5fe4468-7558-4f1e-846b-36b59ee4e432&sb_article_uid=vskXfIeREvxcejXNmQ" target="_blank" rel="noopener" data-apply-cta>
<span class="clinic-compare__apply-pre">クーポンを適用して割引価格を確認する →</span>
<span class="clinic-compare__apply-post"><span class="clinic-compare__apply-status">✓ クーポン適用中</span>DMM 公式でクーポンを使う →</span>
</a>
<p class="clinic-compare__note">
※ 上記は各クリニックの公表情報をもとに整理した参考価格(税込・自由診療)。最新の料金・クーポン条件は各公式サイトをご確認ください。
</p>
</div>
```

### END 誘導文の書き方(私目線・友達感)

intro 例: 「ここまで読んで『やってみてもいいかも』と思ったら、まずは価格を見比べておくと安心です…」

outro 例: 「DMM オンラインクリニックは上のリンクからそのままクーポンが適用される URL になっています。『とりあえず話だけ聞いてみる』のもアリです。」

「最安」「絶対」NG、「条件で選ぶなら DMM が候補」型の合法強コピーを使う([[memory: reference-cvr-patterns]])

質問内容に応じて構成は柔軟調整(「効果系」「料金系」「保険系」などはそれぞれの定石で)。

---

## 実行フロー

1. 渡された mond 質問を解釈、本音(不安・困りごと)を把握
2. **タイトル案 2〜3 を出してユーザーに選んでもらう**(この時点では書き出さない)
3. タイトル確定後、(B) 記事を `src/content/articles/<slug>.md` に Write
4. 同じ slug を使った CTA URL で (A) mond 返信案を作成
5. 完了報告: 確定タイトル / mond 返信案(コードブロック) / プレビュー URL / push 案内

## イテレーション方針

このコマンド自体、ユーザーのフィードバックで都度更新する。新しいルール・好みが出てきたら、このファイルを書き換える。
