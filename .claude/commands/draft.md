---
description: マンジャロメディアのプレビュー記事ドラフトを生成して src/content/articles/ に書き出す
argument-hint: <トピック / 自由形式の指示>
---

# プレビュー記事ドラフト生成

ユーザーから渡された指示: $ARGUMENTS

## ゴール

上記の指示を踏まえて、マンジャロメディアのプレビュー記事(`draft: true`)を 1 本生成し、`src/content/articles/<slug>.md` に Write で書き出す。slug は内容を反映した英数+ハイフンの短い名前。

完了後は次を報告:
- 作成したファイルパス
- プレビュー URL: `https://fujiisunn.github.io/manjaro-media1/preview/<slug>/`
- push が必要な旨

## 原則: md awareness × LLM 主導

- 厳密なテンプレ遵守ではなく、指示の意図を汲んだ柔軟な構成を取る
- ユーザーが「やや変則的な指示」を出してきても、それを優先しつつ下記の最低限ルールは守る
- 内容の良し悪しは LLM の判断に任せる

## 必須ルール(これだけは絶対)

### 1. コンプライアンス([[memory: feedback-compliance]] [[memory: project-persona]])

- 「医師目線」「医師が解説」「医師監修」NG(個人運営/監修なし)
- 媒体側として効能効果や安全性を断定しない(「○○が治る」「絶対安全」NG)
- 医療情報は **出典付き** で書く(「添付文書では」「メーカー(Eli Lilly Japan)公表情報」「臨床試験では」など)
- 記事末尾に <blockquote> 免責文を必ず入れる

### 2. タイトル([[memory: feedback-article-style]])

- **必ず壁打ちする**: 2〜3 案を提案してユーザーに選んでもらう/修正してもらう
- スタイル: フック型・読点(、。!?)で区切る・「要注意」「サイン」など軽いフック語
- 例: 「マンジャロ服用中の激しい動悸は要注意サイン!?副作用と緩和ケア」

### 3. SEO の網を広げる構成

- 症状系記事には「○○の対処法|マンジャロを使っていなくても役立つ N 選」のような **薬剤非依存の一般対処法セクション** を 1 つ以上必ず入れる
- 検索ボリュームを意識した見出しを選ぶ(集客重視ではないが、自然に拾える書き方)

### 4. フロントマター(固定形式)

```yaml
---
title: <タイトル>
description: <120-160 字程度。検索クエリを意識した自然な紹介文>
pubDate: <今日の日付 YYYY-MM-DD>
category: マンジャロ
draft: true
thumb: articles/<slug>.png  # 画像未配置でも frontmatter には書いておく(後で配置)
---
```

### 5. 使えるレイアウト primitives(必要箇所のみ)

```
<mark>キーフレーズ</mark>                       — 蛍光ハイライト
<nav class="toc"><div class="toc__title">目次</div> 1. [...] </nav>  — 目次
<div class="note">…</div>                       — 一般 info ノート
<div class="note note--warn">…</div>            — 警告ノート
<div class="note note--info">…</div>            — TIP ノート
<div class="box">
  <div class="box__title">ラベル</div>
  <div class="box__body">本文</div>
</div>                                          — ラベル付き枠
<blockquote>…</blockquote>                      — 免責・引用
| ヘッダ | … |                                  — テーブル
## / ### / ####                                 — H2(緑バンド) / H3(左アクセント) / H4
```

**重要:** HTML タグ内に Markdown を書くときは前後に空行が必要(CommonMark 仕様):

```
<div class="note">

- 箇条書きを **markdown** で書ける

</div>
```

## 推奨構成(症状記事の場合・指示があればそちらを優先)

1. **リード文** (悩み定義 + 結論先出し + 本記事の案内)
2. **目次** `<nav class="toc">`
3. **要注意サイン** `note--warn` で危険を早出し
4. **すぐできる一般的な対処法 N 選** — 薬剤非依存(SEO の網)
5. **マンジャロ視点の解説** — 添付文書・臨床試験・適正使用情報の出典付き
6. **医師に伝える記録ポイント** `box` で囲む
7. **Q&A** (5 問前後)
8. **まとめ** `box` で囲む
9. **末尾ディスクレーマー** `<blockquote>`

## 実行フロー

1. 渡された指示を読み、トピックと書き方の意向を理解する
2. **タイトル案を 2〜3 出してユーザーに選択してもらう**(この時点では書き出さない)
3. ユーザーがタイトルを確定したら、上記ルールに沿って markdown を生成
4. `src/content/articles/<slug>.md` に Write
5. 作成パス + プレビュー URL + push 案内を報告
