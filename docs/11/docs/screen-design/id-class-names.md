# HTML/CSSのid/class属性値一覧

## WebComponen要素名

要素名|Class名
------|-------
`<game-container>`|`GameContainer`
`<init-scene>`|`InitScene`
`<battle-scene>`|`BattleScene`

## 1. `<init-scene>`（開始画面）

開始画面の親子関係、各HTML要素、id、class名は以下参照。

| 要素 | 属性 | 分類 | 採否の理由 |
| :--- | :--- | :--- | :--- |
| `h1` | なし | - | **不要**。このシーン内に一つしか存在しないタグであり、`init-scene h1` で一意に特定・装飾できるため。 |
| `button` | `name="start"` | 識別 | **必要**。将来的に「設定」ボタンなどが増えた際、JSから「開始」の役割を特定するために `name` で識別する。 |
| (全体) | なし | クラス | **不要**。`init-scene` 自体がコンテナとなるため、内部にラップ用の `div` や `class` は設けない。 |

```html
<init-scene>
  <h1>Gomii</h1>
  <button name="start">開始</button>
</init-scene>
```
```css
```

## `<battle-scene>`

開始画面の親子関係、各HTML要素、id、class名は以下参照。

| 要素 | 属性 | 分類 | 採否の理由 |
| :--- | :--- | :--- | :--- |
| `div` | `name="info"` | 識別 | **必要**。上部の進行情報エリア。`header` タグの代わり。 |
| `span` | `name="hero-name"` | 識別 | **必要**。JSで「英雄」という名前を書き換える可能性があるため。 |
| `span` | `name="turn-count"`| 識別 | **必要**。JSで数値を更新するため。 |
| `div` | `name="status"` | 識別 | **必要**。ライフ数値エリアのコンテナ。 |
| `div` | `name="hero-unit"` | 識別 | **必要**。英雄側の数値一式。左右配置の制御に使用。 |
| `span` | `name="hero-life"` | 識別 | **必要**。JSで数値を更新するため。 |
| `div` | `name="hand"` | 識別 | **必要**。ボタンが並ぶ親要素。 |
| `button`| `name="card"` | 識別 | **必要**。JSで3つのボタンを一括取得（`qa`）するため。 |
| `button`| **`.is-auto`** | **状態** | **必要**。その札が「自動発動」という**性質（モード）**であることを示す。これにより、通常の札と背景色などを変える装飾をDRYに適用できる。 |
| `button`| **`.is-forbidden`**| **状態** | **必要**。その札が「使用禁止」という**動的な状態**であることを示す。これがある時だけ「赤のX印（linear-gradient）」を重ねる装飾を適用する。 |
| `budoux-ja`| `name="detail"` | 識別 | **必要**。JSで説明文を流し込むため。 |

```html
<battle-scene>
  <!-- 1. 進行情報 -->
  <div name="info">
    <span name="hero-name">英雄</span>
    <span name="turn-count">1</span>
    <span name="enemy-name">外敵</span>
  </div>

  <!-- 2. ステータス（28px bold） -->
  <div name="status">
    <div name="hero-unit">
      <span name="hero-life">10</span>/<span name="hero-body">10</span>
    </div>
    <div name="enemy-unit">
      <span name="enemy-life">10</span>/<span name="enemy-body">10</span>
    </div>
  </div>

  <!-- 3. 手札（60px height） -->
  <div name="hand">
    <!-- 状態に応じたクラスが付与される例 -->
    <button name="card">斬る+1</button>
    <button name="card" class="is-forbidden">突貫</button>
    <button name="card" class="is-auto" disabled>自然治癒</button>
  </div>

  <!-- 4. 説明文（16px） -->
  <budoux-ja name="detail"></budoux-ja>
</battle-scene>
```
```css
```




