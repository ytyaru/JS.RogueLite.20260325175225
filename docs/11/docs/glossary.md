# ゲーム用語集 (Glossary)

## 1. 主体 (Entities)
| 識別子 | 絵 | 日全 | 英全 | 日短 | 英短 | 説明 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Hero | 🦸 | 英雄 | Hero | 自 | S | 画面左側（自分） |
| Enemy | 🦹 | 外敵 | Enemy | 敵 | Opp | 画面右側（相手） |
| Self | 👤 | 自分 | Self | 自 | S | 札の効果対象（自分） |
| Opponent | 👥 | 相手 | Opponent | 敵 | O | 札の効果対象（相手） |

## 2. 属性 (Attributes)
| 識別子 | 記号 | 日全 | 英全 | 日短 | 英短 | 説明 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Life | ♥ | 生命点 | Life | 命 | L | 0になると死ぬ数値 |
| Body | ♡ | 身体点 | Body | 体 | B | 回復の上限値 |

## 3. 操作 (Operations)
| 識別子 | 日全 | 英全 | 種類 | 意味 |
| :--- | :--- | :--- | :--- | :--- |
| Lose | 失う | Lose | 値の減少 | 自分の値を減らす |
| Gain | 得る | Gain | 値の増加 | 自分の値を増やす |
| Reduce | 削る | Reduce | 値の減少 | 相手の値を減らす |
| LossInc | 削る量を増やす | Increase reduction | 量の増加 | 減少させる「量」を加算する |
| GainInc | 得る量を増やす | Increase gain | 量の増加 | 増加させる「量」を加算する |

## 4. 札 (Cards)
| 識別子 | 絵 | 名前 | 特性 | 要約(日) | 要約(英) | 全文(日) | 全文(英) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Slash | ⚔️ | 斬る | [連斬] | 敵♥-1♡-N | O♥-1 ♡-N | 相手の生命点を1削ったあと身体点を1削る。[連斬]もし次の番も続けてこの札を選択すれば身体点を削る量を1得る。但し最大3まで。連続選択が途絶えると増分は0に戻る。 | Reduce 1 Life and 1 Body from the opponent. [Combo] If selected consecutively, gain 1 Body reduction amount, up to 3. Resets to 0 if the streak breaks. |
| Rush | 💥 | 突貫 | - | 敵♥-3自♥-1 | O♥-3 S♥-1 | 相手の生命点を3削る。自分の生命点を1失う。 | Reduce 3 Life from the opponent. Lose 1 Life yourself. |
| Medicine | 🧪 | 薬 | - | 自♥+3 | S♥+3 | 自分の生命点を3得る。 | Gain 3 Life. |
| AutoHeal | ✨ | 自然治癒 | [自動] | 自♥+1 | S♥+1 | 自分の生命点を1得る。[自動]この札は選択できず自動発動する。 | Gain 1 Life. [Auto] This card cannot be selected and activates automatically. |

## 5. 進行 (System)
| 識別子 | 絵 | 日全 | 英全 | 日短 | 英短 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Turn | ⏳ | ターン | Turn | T | T |
| Win | 🏆 | 勝利 | Win | 勝 | W |
| Lose | 💀 | 敗北 | Lose | 敗 | L |

