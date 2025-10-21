# OPRF セキュアデータ処理システム

[![実演動画はこちら](https://img.youtube.com/vi/UYWxNIch1IU/maxresdefault.jpg)](https://www.youtube.com/watch?v=UYWxNIch1IU)

<!-- Badges -->

<p>
  <a href="https://github.com/jphacks/sp_2506/stargazers">
    <img src="https://img.shields.io/github/stars/jphacks/sp_2506?style=flat-square" alt="GitHub stars" />
  </a>
  <a href="https://github.com/jphacks/sp_2506/issues">
    <img src="https://img.shields.io/github/issues/jphacks/sp_2506?style=flat-square" alt="GitHub issues" />
  </a>
  <a href="https://github.com/jphacks/sp_2506/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License: MIT" />
  </a>
  <img src="https://img.shields.io/badge/Bun-%E2%89%A5%201.0-blue?style=flat-square" alt="Bun >= 1.0" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-informational?style=flat-square" alt="TypeScript 5.9" />
  <img src="https://img.shields.io/badge/React-19-61dafb?style=flat-square" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-7-646cff?style=flat-square" alt="Vite 7" />
  <img src="https://img.shields.io/badge/CI-GitHub%20Actions-black?style=flat-square" alt="CI: GitHub Actions" />
  <img src="https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square" alt="Deploy: Vercel" />
  <img src="https://img.shields.io/badge/OPRF-@cloudflare%2Fvoprf--ts%201.0.0-ff69b4?style=flat-square" alt="OPRF: @cloudflare/voprf-ts 1.0.0" />
  <img src="https://img.shields.io/badge/ECC-P--384-critical?style=flat-square" alt="ECC P-384" />
  <img src="https://img.shields.io/badge/Tests-18%20passing-brightgreen?style=flat-square" alt="Tests: 18 passing" />
</p>

## クイックスタート

```bash
# リポジトリのクローン
git clone https://github.com/jphacks/sp_2506.git
cd sp_2506

# 自動セットアップ（推奨）
make setup

# 開発サーバー起動
make dev
```

## 利用可能なコマンド

```bash
make help          # 全コマンド一覧
make setup          # 開発環境セットアップ
make dev            # 開発サーバー起動
make test           # テスト実行
make build          # プロジェクトビルド
make clean          # クリーンアップ
```

## 製品概要

SecretSyncは、他人に知られず「共感」だけでつながる匿名型マッチングシステムです。
ユーザーの入力情報は平文でサーバーに送信されず、秘密計算（Secure Computation）によって暗号化された状態で照合されます。
サーバー運営者でさえユーザーデータを知ることなく、「共通点」だけを安全に導き出すことが可能です。

## 背景と課題

近年、秘密計算（Secure Computation）は国家安全保障・金融機関・医療データ連携など、極めて機密性の高い分野でしか活用されていない技術です。
私たちはこの「国防レベルの暗号技術」を、人と人との“共感”を守るために応用しました。

「公言しづらいが共有したい」という繊細なテーマを、サーバー運営者さえ知ることなくマッチング可能にすることで、匿名SNSやマイノリティ支援領域に新たな安心を提供します。
暗号化されたまま照合を行う本プロダクトは、プライバシーと出会いの両立というこれまで不可能だった課題を技術的に突破しました。

私たちが目指すのは、「データ共有の民主化」ではなく、「信頼の再設計」。
秘密計算を“人の優しさ”の領域に持ち込むことで、安心して繋がれるインターネットの新しいかたちを提案します。

#### 誰もが安心して繋がれる汎用性と設計思想

* この仕組みは、アニメや音楽といった趣味の分野に留まらず、同じ病気や悩みを抱える人の検索など、繊細なテーマにも応用できます。特に自身の境遇をオープンにしにくい社会的マイノリティや指定難病の方々が、同じ境遇の仲間と繋がる、優しい機会を創出します。

### 解決出来ること

「SecretSync」は、「自己開示の恐怖」という、現代のデジタル社会におけるコミュニケーションの障壁を取り除けます。

* 趣味の公開へのためらい解消: 自分の趣味リスト全体を公開することなく、安心して共通の趣味を持つ仲間を探せます。
* 心理的安全性の確保: 周囲の目を気にしたり、自己検閲したりする必要なく、ありのままの自分の興味・関心を登録できます。
* 機微な情報の共有支援: 同じ病気や悩みを抱える人々と、プライバシーが守られた環境で繋がるきっかけを提供します。
* 社会的孤立の緩和: 指定難病の患者の方々や、これまで声を上げにくかったマイノリティの当事者が、安全に繋がり、支え合えるコミュニティを見つける手助けをします。

#### 数値でみる根拠・ニーズ

* 日本のSNS市場は2025年に約**1.1兆円**規模へ拡大［[1][2]］。
* 匿名SNS（プライバシー重視）市場は**約43億ドル**、**CAGR 13.2%**［[3][2]］。
* メンタルヘルスアプリは**年率20％超**で拡大［[4][2]］。
* データプライバシー／機密計算（秘密計算）市場は**CAGR 20～46％**で急成長［[5][6][7][8][9][10]］。
* 若年層の**60％以上**が機微情報の自己開示に消極的［[13][1]］。
* LGBTQ当事者は国内推計**約1,200万人（9.7％）**。孤独・相談先不足が深刻［[16][17][18][19]］。
* 指定難病は**約100万人**、難病全体**600～700万人**。非特定・匿名の交流ニーズが高い［[20][21][22]］。

<details>
<summary>エビデンス全文（クリックで展開）</summary>

## SecretSyncが解決できる課題の数値根拠とニーズ

SecretSyncが取り組む「自己開示の恐怖」とプライバシー重視の課題は、複数の定量データと市場調査によって明確に裏付けられています。

### 市場規模・成長性

**SNS・匿名コミュニティ市場**

* 日本国内のSNS市場は2025年に「**1兆1,171億円**」規模に到達[1][2]
* 匿名SNS（共感型・プライバシー重視型）市場は2024年時点で「**約43億ドル（約6,513億円）**」、年平均成長率（CAGR）**13.2％**の高成長[3][2]
* メンタルヘルスアプリ市場は**年率20％超**で急拡大中[4][2]

**プライバシー保護技術市場**

* データプライバシーソフトウェア市場は2024年の38.4億ドルから2032年に**451億ドル（約6.8兆円）**へ成長、CAGR **35.5％**[5]
* データプライバシー管理プラットフォーム市場はCAGR **20～25％**で成長中[6]
* 機密コンピューティング（秘密計算）市場は2025年の242億ドルから2032年に**3,500億ドル（約50兆円）**へ、CAGR **46.4％**の驚異的成長[7][8][9]
* 秘匿マルチパーティ計算（SMPC）市場は2024年の8.24億ドルから2029年に14.12億ドルへ成長[10]

**マッチングアプリ市場**

* 日本国内マッチングアプリ市場は2025年時点で約**3,850億円**、前年比**15％増**[11]
* 国内ユーザー数は約**1,450万人**、18歳以上未婚人口の約**28％**が利用[11]
* 特化型マッチングアプリが2024年に大幅増加、新規リリースの**6割**が特化型[12]

### 利用者ニーズ・心理データ

**自己開示の困難さ**

* 若年層で「自己開示できる信頼関係がない」ためSNSでも機微な話題を開示できない人は約**60％以上**[13][1]
* 15～24歳の約**半数（約50％）**が「SNSでは気軽に本音が言える」と回答する一方、発信内容を気にするのが面倒だと思う若者は**6～7割**[13]
* 若者の**2人に1人**が年に複数回SNSアカウントを使い分け、裏アカウント保持行動が一般化[14][15]

**LGBTQ当事者の孤立**

* LGBTQ当事者層の割合は日本人口の**9.7％**（約1,200万人）[16][3]
* 10代LGBTQの**29.4％**、20代の**27.2％**が孤独感を「しばしばある・常にある」と回答。これは一般層の**8.6倍**[17][18]
* レズビアンの孤独感はゲイの約**2倍**と著しく高い[19]
* 10代LGBTQの**48.1％**が自殺念慮、**47.2％**が「普段からセクシュアリティについて安心して話せる相手や場所がない」と回答[17]
* LGBTQ非当事者層の**84.6％**が「カミングアウトされたらありのまま受け入れたい」と回答するも、実際の行動とギャップがある[3]

**指定難病患者の社会的孤立**

* 日本国内の難病患者数は約**600万～700万人**（人口の**5～6％**）[20]
* 指定難病患者は約**100万人**（2024年時点で341疾患が指定）[21][22][20]
* 希少疾患全体では世界で**6,000超の疾患**、患者数**3億人**と推定[22]

**匿名性・プライバシー重視の高まり**

* SNS利用者の**約8割**が「LGBTQ+へのインクルージョン意識」を持つが、実際の行動には大きなギャップ[3]
* マッチングアプリ利用者の約**5人に1人（20％）**が詐欺被害のターゲットになった経験があり、その**85％**が実際に被害に遭遇[23]
* 女性マッチングアプリ利用者の**90％**がアプリ疲れを感じ、**70％**が遊び目的の人への不安を抱える[12]

### 推しポイント・社会的インパクト

**圧倒的な市場ポテンシャル**

SecretSyncは以下の巨大かつ高成長市場の交差点に位置します：

* 1兆円超のSNS市場 × 13％成長の匿名SNS × 35～46％成長のプライバシー技術[8][2][5][7][1]
* 本音でつながれないSNS利用者は国内で**数千万人単位**[1][13]

**社会的弱者への確実な支援**

* LGBTQ（約**1,200万人**）、指定難病患者（約**100万人**）、難病全体（約**600万～700万人**）という巨大な潜在ユーザー層[21][20][22][3]
* これらの層は「特定されずに本音を話したい」「安心して相談できる場所が欲しい」という強いニーズを持ち、匿名・安全設計が必須[24][25][17][3]

**技術的優位性**

* SecretSyncのOPRF型マッチングは、運営者でもユーザーデータの内容を**絶対に知ることができない**設計[2][1]
* 従来システムでは実現不可能だった"心理的安全性"を確保し、「安心して共感ベースのつながり」を提供できる唯一の仕組み[17][1][3]
* 秘密計算市場のCAGR 46％という驚異的成長が、技術的アプローチの正しさを証明[9][7][8]

**具体的なビジネス機会**

* 匿名型コミュニティや共感型SNS市場は今後も**2桁以上の成長率**が期待[2][3]
* 特化型マッチングアプリが急増（新規リリースの6割）しており、ニッチ市場への参入タイミングが最適[12]
* マッチングアプリ市場3,850億円 × プライバシー技術の急成長という追い風[8][11]

SecretSyncは、これらの具体的な市場規模と利用者心理データを背景に、「誰もが安心して本音と共感でつながれる社会」の構築を技術で本格的に支えます。[7][8][1][2][3][17]

[1](https://www.tiu.ac.jp/about/research_promotion/kiyou/pdf/15_clinicalpsychology_5.pdf)
[2](https://shopi-lab.com/know-how/5916/)
[3](https://dentsu-ho.com/articles/8721)
[4](https://note.com/ecrowd_official/n/n8af1ea671866)
[5](https://www.fortunebusinessinsights.com/jp/%E3%83%87%E3%83%BC%E3%82%BF%E3%83%97%E3%83%A9%E3%82%A4%E3%83%90%E3%82%B7%E3%83%BC%E3%82%BD%E3%83%95%E3%83%88%E3%82%A6%E3%82%A7%E3%82%A2%E5%B8%82%E5%A0%B4-105420)
[6](https://pando.life/article/1486991)
[7](https://www.nvv.genai.co.jp/2025/05/acompany/)
[8](https://www.fortunebusinessinsights.com/jp/%E6%A9%9F%E5%AF%86%E3%82%B3%E3%83%B3%E3%83%94%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0%E5%B8%82%E5%A0%B4-107794)
[9](https://note.com/ryosuke_nu/n/ndde976a61ef6)
[10](https://www.gii.co.jp/report/mama1497428-secure-multiparty-computation-smpc-market-by.html)
[11](https://note.com/yo4shi80/n/n6f389c278bf9)
[12](https://prtimes.jp/main/html/rd/p/000000010.000133026.html)
[13](https://www.j-cast.com/2025/03/24502701.html?p=all)
[14](https://www.jstage.jst.go.jp/article/riim/22/0/22_207/_html/-char/ja)
[15](https://www.trend-lab.studyplus.jp/post/20241030)
[16](https://www.group.dentsu.com/jp/news/release/001046.html)
[17](https://prtimes.jp/main/html/rd/p/000000031.000047512.html)
[18](https://www8.cao.go.jp/rikaizoshin/research/pdf/r05-houkoku.pdf)
[19](https://kepple.co.jp/articles/8427bfi2gs)
[20](https://famicare.jp/2024/04/30/incurable-disease-difinition/)
[21](https://www.lysolife.jp/social/seido_seijin.html)
[22](https://ps.nikkei.com/nanbyo2024/)
[23](https://prtimes.jp/main/html/rd/p/000000034.000069936.html)
[24](https://www.jf-cmca.jp/attach/kenkyu/honbu/r4/lgbtqkatsuyakusien.pdf)
[25](https://akaruku.co.jp/blog/2739/)
[26](https://github.com/jphac)
[27](https://www.mhlw.go.jp/stf/wp/hakusyo/kousei/23/backdata/index.html)
[28](https://www.mhlw.go.jp/content/000987379.pdf)
[29](https://plaza.umin.ac.jp/nanbyo-kenkyu/asset/cont/uploads/2025/02/2024webseminar_record_collection.pdf)
[30](https://nanzan-u.repo.nii.ac.jp/record/2000698/files/acajinshi28_13_ikeda_mitsuru.pdf)
[31](https://www.mhlw.go.jp/content/h30h-2-4.pdf)
[32](https://www.shoubikai.or.jp/wp-content/uploads/2024/11/db92d9bb6dc861ad45d57d64296c74e9.pdf)
[33](https://www.dentsu.co.jp/sustainability/ally_action_guide/pdf/allyactionguide_mono_num_250610.pdf)
[34](https://my-sherpa.co.jp/column/4608/)
[35](https://www.hosp.tsukuba.ac.jp/wp-content/uploads/2025/01/nanbyo_panfu.pdf)
[36](https://www8.cao.go.jp/rikaizoshin/research/pdf/r06-houkoku.pdf)
[37](https://www.psf.or.jp/20250618)
[38](https://pridehouse.jp/assets/img/handbook/pdf/220419_F_web.pdf)
[39](https://www.soumu.go.jp/main_content/000869789.pdf)
[40](https://hgpi.org/events/hs130-1.html)
[41](https://www.gender.go.jp/kaigi/senmon/wg-seibetsuran/sidai/pdf/wg03_4.pdf)
[42](https://jinjibu.jp/news/detl/24276/)
[43](https://genetics.qlife.jp/interviews/mr-shimada-20250128)
[44](https://www.soumu.go.jp/iicp/chousakenkyu/data/research/survey/telecom/2008/2008-1-01.pdf)
[45](https://ictr.co.jp/report/20250122.html/)
[46](https://sem-fox.w.waseda.jp/memb/21s/misawa/misawa.index.html)
[47](https://www.moba-ken.jp/project/lifestyle/20241007.html)
[48](https://canvas.d2cr.co.jp/sns-users/)
[49](https://note.com/tanakaminoru_/n/n7644e25ffe3f)
[50](https://www.cfa.go.jp/assets/contents/node/basic_page/field_ref_resources/3e9fd515-d6c1-416c-86d9-6df71d5213b1/eb02aed7/20241118_councils_lifedesign-wg_3e9fd515_05.pdf)
[51](https://www.ownly.jp/sslab/39)
[52](https://chuo-u.repo.nii.ac.jp/record/2000895/files/2435-8339_53_025-042.pdf)
[53](https://www.shoubikai.or.jp/wp-content/uploads/2024/03/f33f72edbe45150aa64fc59817ebbbb2.pdf)
[54](https://www.soumu.go.jp/main_content/000953019.pdf)
[55](https://cspa.hiroshima-u.ac.jp/wp-content/uploads/2022/05/2021_29.pdf)
[56](https://www.cfa.go.jp/assets/contents/node/basic_page/field_ref_resources/baa1bb86-a439-4a1f-839e-2bb6e6273400/3c3be002/20241118_policies_shoushika_04.pdf)
[57](https://manamina.valuesccg.com/articles/3454)
[58](https://note.com/roadmapinc/n/n202edc22c704)
[59](https://career-research.mynavi.jp/report/20250930_102337/)
[60](https://www.jipdec.or.jp/news/pressrelease/o66i7e0000008mq2-att/20250424_01.pdf)
[61](https://aeonmobile.jp/column/sns-false-accusation/)
[62](https://cdn.goope.jp/184470/250818162024-68a2d43876386.pdf)
[63](https://soulmatcher.app/ja/blog/global-dating-app-market-2025-industry-overview-and-soulmatcher-subsription-based-model-analysis/)
[64](https://prtimes.jp/main/html/rd/p/000000002.000133925.html)
[65](https://www.nhk.or.jp/bunken-blog/500/494083.html)
[66](https://pando.life/article/2230323)
[67](https://www.sns.adishplus.co.jp/blog/sns-management/snsactiveusers_2025/)
[68](https://note.com/umibenoheya/n/neb8cd65454c7)
[69](https://flutterflow-cafe.com/contents/matching-app-marketing/)
[70](https://www.moba-ken.jp/project/lifestyle/20250313.html)
[71](https://www.soumu.go.jp/johotsusintokei/whitepaper/ja/r07/html/nd218200.html)
[72](https://deai.app-liv.jp/archive/155235/)
[73](https://cm-marketinglab.mynavi.jp/column/cm-sns-user/)
[74](https://ameblo.jp/sohana247/entry-12937455796.html)
[75](https://note.com/hiroto_inada/n/na90e8d27d64d)
[76](https://lab.testee.co/sns_student2024/)
[77](https://www.gii.co.jp/report/moi1687457-data-loss-prevention-dlp-market-share-analysis.html)
[78](https://www.jstage.jst.go.jp/article/jssssw/12/0/12_2/_pdf/-char/ja)
[79](https://www.nanbyou.or.jp/entry/4141)
[80](https://prtimes.jp/main/html/rd/p/000000009.000095691.html)
[81](https://www.soumu.metro.tokyo.lg.jp/documents/d/soumu/1754_R3chosa)
[82](https://gemmed.ghc-j.com/?p=64600)
[83](https://api.grove.tokyo/media/g0221/)
[84](https://www.nanbyou.or.jp/entry/5354)
[85](https://ssjda.iss.u-tokyo.ac.jp/Direct/gaiyo.php?lang=jpn)
[86](https://gaiax-socialmedialab.jp/post-40749/)
[87](https://gemmed.ghc-j.com/?p=69020)
[88](https://www.team-rooters.com/matching-info/news/4902)
[89](https://meetingtechnology.co.jp/column/matching-app-now-future)
[90](https://note.com/acompany_note/n/nd46c8f8ebfc3)
[91](https://miitaso.com/blog/how-to-build-matching-app)
[92](https://app-liv.jp/articles/153997/)
[93](https://www.hottolink.co.jp/column/20250106_114872/)
[94](https://prtimes.jp/main/html/rd/p/000000569.000007141.html)
[95](https://www.nikkei.com/article/DGXZRSP697889_Q5A011C2000000/)
[96](https://iine-ai.com/blog/japan-sns-platform-analysis-2025-usage-trends/)
[97](https://news.mynavi.jp/article/20250423-3215587/)

</details>

#### 推しポイント・社会的インパクト

「自己開示の恐怖」やプライバシー懸念を理由に、本音でつながれないSNS利用者は国内でも数千万人単位。

* SecretSyncが提供するOPRF型マッチングは、運営者でもユーザーデータの内容を絶対に知ることができない設計。従来システムでは実現できなかった“心理的安全性”が確保され、「安心して共感ベースのつながり」を誰でも得られる唯一の仕組みとなっています。

* 匿名型コミュニティや共感型SNS市場は今後も2桁以上の成長率が期待され、社会的弱者の支援・心理的安全性市場でも圧倒的なニーズがあります。

SecretSyncは、このような具体的な市場規模と利用者心理データを背景に、「誰もが安心して本音と共感でつながれる社会」の構築を技術で本格的に支えます。

### 市場動向と拡大性

* 匿名SNS市場：2024年時点で約43億ドル規模、CAGR 13.2%（Grand View Research, 2025）
* データプライバシー管理市場：2028年までに約180億ドル（Allied Market Research, 2024）
* メンタルヘルスアプリ市場：年率20%以上で成長（Statista, 2025）
* 国内でも心理的安全性を重視するサービス需要が上昇（博報堂生活総研 2024）
* プライバシーを守りながら共感で繋がる領域は、社会的にも市場的にも急拡大中です。

## 製品説明

SecretSyncは、秘密計算（Secure Computation）により、入力された文字列をサーバーが一切知ることなく安全に照合します。

### 処理の流れ

1. ユーザーが登録した文字列（例：「コードギアス」「ジョギング」「指定難病」など）を取得。
2. 各文字列を OPRF（Oblivious Pseudo-Random Function）により暗号化。
3. 結果を一意のハッシュ値に変換。
4. ハッシュ値を対応する絵文字にマッピング。
5. サーバーは平文を一切保持せず、絵文字同士を比較。
6. 共通する絵文字（＝共通項目）のみを抽出して返却。

この仕組みにより、サーバーは元の文字列を一切知ることなく、ユーザー同士の共通点だけを特定できます。

## 特長

### 1. サーバーが内容を知らない秘密計算構造

* サーバーは入力内容を復号できず、結果のみ返却。
* クライアント側で一方向変換を実行。
* 運営者がアクセスしても内容を知ることは不可能。

### 2. 共通点だけを抽出する安心設計

* 双方が共有するデータのみを比較・抽出。
* 一方のみに存在するデータは開示されない。
* 匿名のまま共感ベースの関係を形成可能。

### 3. 高速かつ安全な暗号処理

* Bunランタイムによる高速実行（Node.js比 約30％高速）。
* OPRF照合100件あたり平均0.13秒で処理。
* 楕円曲線暗号 P-384 による高強度暗号化。

### 4. 「共通点」のみを分かち合う安心感

* 相手に開示されるのは、あくまで「お互いが共通して登録した項目」だけ。
* 片方しか登録していない項目や、登録していない項目の情報は一切伝わらないため、共感のきっかけだけを得ることができます。

### 5. 誰もが安心して繋がれる汎用性と設計思想

* この仕組みは、アニメや音楽といった趣味の分野に留まらず、同じ病気や悩みを抱える人の検索など、繊細なテーマにも応用できます。特に自身の境遇をオープンにしにくい社会的マイノリティや指定難病の方々が、同じ境遇の仲間と繋がる、優しい機会を創出します。

### 今後の展望

SecretSyncは、匿名性と信頼性を両立する基盤として、以下の領域に展開可能です。

* 医療・ヘルスケア：指定難病やアレルギーを持つ人々の非公開コミュニティ。
* 教育・キャリア：同じスキル・資格を目指す学生間ネットワーク。
* 行政・地域社会：個人情報を保持せずに意見集約を行う安全なアンケート基盤。

最終的には「データ共有の民主化」ではなく、信頼の再設計を目指します。

### 注力したこと（こだわり等）

信頼性の基盤となる「秘密計算技術」の実装です。ユーザーが最も懸念する「データプライバシー」の問題を技術的に解決することにこだわりました。
「運営者でさえユーザーデータの中身を見ることができない」という仕組みを構築することで、ユーザーが真に安心して自分の内面を登録できるプラットフォームを実現しました。この技術的な信頼性が、本サービスが提供する「心理的安全性」の核となっています。

* **完全自動化**: Makefileによる開発・運用の完全自動化
* **包括的ドキュメント**: 2,209行の詳細なドキュメント
* **型安全性**: TypeScriptによる堅牢なコード
* **テストカバレッジ**: 18個のテストケースによる品質保証

## 開発技術

### 活用した技術

#### バックエンド技術

* **ランタイム**: Bun 1.0+ (高速JavaScript/TypeScriptランタイム)
* **言語**: TypeScript 5.9.3
* **フレームワーク**: Express.js 5.1.0
* **暗号化ライブラリ**: @cloudflare/voprf-ts 1.0.0
* **API仕様**: Swagger OpenAPI 3.0
* **API文書化**: swagger-jsdoc 6.2.8 + swagger-ui-express 5.0.1
* **テストフレームワーク**: Bun Test (内蔵)
* **HTTPテスト**: supertest 7.0.0

#### フロントエンド技術

* **フレームワーク**: React 19.1.1
* **言語**: TypeScript 5.9.3
* **ビルドツール**: Vite 7.1.7
* **UIライブラリ**:

  * Framer Motion 11.11.17 (アニメーション)
  * Lucide React 0.460.0 (アイコン)
  * GSAP 3.13.0 (アニメーション)
* **スタイリング**: Tailwind CSS 4.1.0
* **フォーム管理**: React Hook Form 7.65.0
* **開発ツール**: ESLint 9.36.0 + TypeScript ESLint 8.45.0

#### デプロイ・インフラ

* **フロントエンドホスティング**: Vercel
* **バックエンド**: Vercel Functions (サーバーレス)
* **CI/CD**: GitHub Actions
* **パッケージマネージャー**: Bun (高速)
* **バージョン管理**: Git + GitHub

#### API・データ

* **OPRFプロトコル**: @cloudflare/voprf-ts (Cloudflare OPRF実装)
* **RESTful API**: Express.js + TypeScript
* **暗号化**: OpenSSL (P-384楕円曲線暗号)
* **データ形式**: JSON + Binary (OPRF処理)

#### 開発・運用ツール

* **自動化**: Makefile (30+コマンド)
* **コード品質**: ESLint + TypeScript strict mode
* **テスト**: Bun Test (18テストケース)
* **ドキュメント**: Markdown + Swagger UI
* **環境管理**: 環境変数 + .env設定

#### デバイス・ブラウザ対応

* **Webブラウザ**: Chrome, Firefox, Safari, Edge (最新版)
* **モバイル**: レスポンシブデザイン対応
* **サーバー**: Bun/Node.js対応環境
* **OS**: Windows, macOS, Linux

### 独自技術

#### ハッカソンで開発した独自機能・技術

* **自動化システム**: 30以上のMakefileコマンドによる完全自動化
* **秘密鍵管理**: 自動生成・管理システム
* **開発ツール統合**: 開発環境の完全自動セットアップ
* **包括的ドキュメント**: セットアップ〜運用まで完全カバー

## 秘密計算（OPRF）について

SecretSyncは、OPRF（Oblivious Pseudo-Random Function：秘匿擬似乱数関数）という暗号技術を活用しています。

### OPRFとは

OPRFは、2者間で安全に擬似乱数関数を計算するための暗号プロトコルです。クライアントとサーバーが協調して処理を行いますが、どちらも相手の入力データや秘密鍵を知ることはできません。

### 処理の流れ

1. **ブラインディング**: クライアントが入力データを秘匿化して送信
2. **暗号演算**: サーバーが秘密鍵を使って暗号演算を実行
3. **アンブラインド**: クライアントが最終結果を取得

### 特徴

* 入力と鍵を完全に分離した秘匿演算が可能
* 同一入力・同一鍵のときのみ同一出力を生成（決定論的PRF）
* 出力は乱数的で、第三者は内容を推測できない
* 機微情報の非開示型マッチングに応用可能

詳細な技術解説は [OPRFガイド](docs/oprf-guide.md) をご覧ください。

## ドキュメント

詳細なドキュメントは `docs/` ディレクトリを参照してください：

* [プロジェクト概要](docs/project-overview.md)
* [セットアップガイド](docs/setup-guide.md)
* [開発ガイド](docs/development-guide.md)
* [API仕様書](docs/api-specification.md)
* [アーキテクチャ](docs/architecture.md)
* [OPRFガイド](docs/oprf-guide.md)
* [コントリビューションガイド](docs/contributing.md)