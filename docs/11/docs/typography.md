# 文章を美しく表示する

日本語の文章を読みやすく表示するツールは、ブラウザとは別に用意すべきである。もしDTPの追い込み（自動折返しで句読点が行頭に来ないよう前行末尾に字を縮めて無理やり入れる）など、読みやすいテキスト表示をしたいなら、その処理は画像処理になり負荷が大きい。

JSだと1字ずつ`getBoundingClientRect()`することになる。この時点で非現実的な処理負荷だ。

[mojik][]というライブラリはあるが、これは追い込みでなく全角の約物を半角化するだけだ。

[BudouX][]は文節単位で自動折返しするものであって、追い込みよりも雑な処理である。

[mojik]:https://terkel.github.io/mojik/
[BudouX]:https://developers-jp.googleblog.com/2023/09/budoux-adobe.html

## Webで実現できるタイポグラフィ

```html
<h1>〜<h6>
<p>
<em>/<strong>
<div>/<span>
```
```css
font-family
font-size
font-weight
font-style: bold/itaric
line-height: 1.5em;
letter-spacing: 0.05em;

color:
background-color:
text-decoration: underline;
text-align: center;
text-transform: uppercase;

@keyframes
```
```css
word-break: auto-phrase;
```

[BudouX][]により文節単位で自動折返しする。

```js
<budoux-ja>今日は天気です。</budoux-ja>
<script src="https://unpkg.com/budoux/bundle/budoux-ja.min.js"></script>
```

