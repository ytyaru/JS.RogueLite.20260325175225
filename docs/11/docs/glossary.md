# ゲーム用語集 (Glossary)

## 1. 主体 (Entities)

### A. 日本語定義
| 項目 | `自分` | `相手` | 説明 |
| :--- | :--- | :--- | :--- |
| 画面 | 左 | 右 | 配置位置 |
| 名前 | `英雄` | `外敵` | 画面上の表示名 |
| 役割 | 遊戯者 | 計算機 | 意思決定の主体 |
| 交代 | 行動者 | 対象者 | ターンごとの相対的役割 |

### B. 英語定義 (内部識別子)
| 項目 | `Self` | `Opponent` | 説明 |
| :--- | :--- | :--- | :--- |
| 画面 | 左 | 右 | |
| 名前 | `Hero` | `Enemy` | |
| 役割 | `PlayerBattler` | `ComputerBattler` | クラス名等に使用 |
| 交代 | `Actor` | `Target` | 文脈上の役割 |

## 2. 属性 (Attributes)
| 識別子 | 名称 (日) | 名称 (英) | 意味 |
| :--- | :--- | :--- | :--- |
| `Life` | 生命点 | Life Point | 0になると死ぬ数値。 |
| `Body` | 身体点 | Body Point | 生命点の回復上限値。下限1。 |

## 3. 操作：絶対値 (Operations: Absolute)
| 識別子 | 名称 (日) | 名称 (英) | 意味 |
| :--- | :--- | :--- | :--- |
| `Add` | 増やす | Add | 属性を加算する。 |
| `Sub` | 減らす | Sub | 属性を減算する。 |

## 4. 操作：相対値 (Operations: Relative)
| 識別子 | 名称 (日) | 名称 (英) | 意味 |
| :--- | :--- | :--- | :--- |
| `Increase` | 量を増やす | Increase Amount | 量を増やす動詞 |
| `Decrease` | 量を減らす | Decrease Amount | 量を減らす動詞 |

| 識別子 | 名称 (日) | 名称 (英) | 意味 |
| :--- | :--- | :--- | :--- |
| `IncAmt` | 増加量 | Increase Amount | 変化量の固有名詞(増加方向) |
| `DecAmt` | 減少量 | Decrease Amount | 変化量の固有名詞(減量方向) |

以下は未使用の用語。いわゆるダメージに相当するが、生命点と身体点の二つがあり、変化量とかけあわさって組合せ爆発するため却下。

| 識別子 | 名称 (日) | 名称 (英) | 意味 |
| :--- | :--- | :--- | :--- |
| `LifeDamage` | 命傷 | Life point Damage | 生命点の減少量
| `BodyDamage` | 体傷 | Body point Damage | 身体点の減少量
| `LifeRecovery` | 命癒 | Life point Recovery | 生命点の増加量（身体点が上限）
| `BodyRecovery` | 体癒 | Body point Recovery | 身体点の増加量（上限なし？なら成長と呼ぶべきでは？）
| `LifeDA` | 命傷量 | Life point Damage Amount | 生命点の減少量の変化量
| `BodyDA` | 体傷量 | Body point Damage Amount | 身体点の減少量の変化量
| `LifeRA` | 命癒量 | Life point Recovery Amount | 生命点の増加量の変化量
| `BodyRA` | 体癒量 | Body point Recovery Amount | 身体点の増加量の変化量

## 5. 条件
| 識別子 | 名称 (日) | 名称 (英) | 意味 |
| :--- | :--- | :--- | :--- |
| `IfElse` | `もし〜なら、〜する。さもなくば、〜する。` | `If [Condition], [Action]. Otherwise, [Action].` | 条件が真・偽の場合に行う行動を示す |

## 6. 進行 (System)
| 識別子 | 名称 (日) | 名称 (英) | 意味 |
| :--- | :--- | :--- | :--- |
| `Turn` | `順` | Turn | 1サイクル（自他1回ずつの行動）を示す単位。 |
| `Win` | `勝利` | Win | 相手の生命点を0にした状態。 |
| `Lose` | `敗北` | Lose | 自分の生命点が0になった状態。 |

## 7. 札の特性 (Characteristics)
| 識別子 | 名称 (日) | 名称 (英) | 意味 |
| :--- | :--- | :--- | :--- |
| `Combo` | `[連斬]` | Combo | 連続選択によって効果が累積する性質。 |
| `Auto` | `[自動]` | Auto | 選択を介さず配布時に発動する性質。 |

## 8. 札の説明文 (Card Descriptions)

| 札名 | 全文説明 (日本語) | Full Description (English) |
| :--- | :--- | :--- |
| **斬る** | 相手の生命点と身体点を1減らす。もしこの札を続けて選択したなら、身体点の減少量を1増やす(最大2)。さもなくば、減少量を0に戻す。 | Decrease 1 Life and 1 Body from the opponent. If this card is selected consecutively, increase the Body decrease amount by 1 (Max 2). Otherwise, the decrease amount resets to 0. |
| **突貫** | 相手の生命点を3減らす。自分の生命点を1減らす。 | Decrease 3 Life from the opponent. Decrease 1 Life from yourself. |
| **薬** | 自分の生命点を3増やす。 | Increase 3 Life for yourself. |
| **自然治癒** | 自分の生命点を1増やす。この札は選択できず自動発動する。 | Increase 1 Life for yourself. This card cannot be selected and activates automatically. |

