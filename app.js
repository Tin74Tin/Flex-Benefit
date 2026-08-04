(function(){
  "use strict";

  /* =========================================================
     SETUP
  ========================================================== */
  function configIsValid(){
    var c = window.SUPABASE_CONFIG || {};
    return !!(c.url && c.anonKey &&
      c.url.indexOf('YOUR-PROJECT-REF') === -1 &&
      c.anonKey.indexOf('YOUR-PUBLIC-ANON-KEY') === -1);
  }

  var supabase = configIsValid()
    ? window.supabase.createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.anonKey)
    : null;

  var CRESCO_LOGO_DATA_URI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAR0AAABaCAYAAACFQIIbAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAzEElEQVR4Xu2dCbRVxbH3773gEI1xQmIG56eoiEx5MSbLYBAVh/geGhU1IBqNGUwgODwjcYxjHKLoe/meoiLGEQlG/RIw4sR6DlFmRHEWNV+CEzyjxgCX7/ffdu/02Wfv3b3P2efeGzx7rbPuPWdXV1dXd1dXV1dVt7Y0+Jk9e/bOC59+euD9M2Z8k6rWmr9gwZf4+wGfHR54f52Wti2/0NJth+0W8H1Vt223nrnWkK9f//etvvD8+htu+H5R0j66Z/q3/z79wR+teu7FAWsP3etX64393o+L4mjCNznQVTmwYv6if21/9bV+q55/edCql17ZGzrbGOs9RG/7kjdaBq//kf790659+rzM3xUD+/efvscee9zVs0ePN7645ZbvdZV2tZZNyPvLl7fNfOyxwbfcdtsoBMyAubNm7ZioI67znR2/mlk9wuehtff9xoSVX//KbxFAf/XRSb3rrzj0uJdgfk/BUv7+Da6+SB3TfJoc+KflgATN366ZdDHCpbcd21mN2eTZR5OvVtsfRo4adRNC6KlDhg27GQH0TmcypDShI2EzYeLEH9wwadJ3ETR9QhqVJ3RseTShpWgtk1Z/54gLET6ZzPrg8v/zCzrnFFsOoTMDoTMkhI4mTJMDXYkDzKXPdH/k8QM/vGrCxQiaL4bSliJ0UoUQAujGI4cP//XQoUNnhOIuE65uoQODuiNsTkDYHI+w6esjrt/AgYsFgwr46vg/vb8PW6tHkOL9Ye4GvrLrfnfkpWyZYsFi4aFhPbScN8CxkSOslm103+SNfTib75sc6CockLBpve7W0/4+bcZxjOXNfHSxIL/L/JkNXJtgf/jXP8sk8Td2GDsxF3v7yjMX540dM+bikSNG3OqDLfN9XUIHe80uxx5//EQaODCPKBq3QI3bpXfvBb22224xGku0+XQfGL4B0v0A9qsDYPqoLKbD6D9/6kfHjVnnm/vebstjyzns/VPOib/rd+DeQ+h8pkxmNXE1OdAoDjCGD0ezGe/bQqHB/xazwy2YHaYzj5Zn0fP6kiWbLVy0aFfMHEdPmjhxhGd+zrn+2mtHDhgwYGGj2lcK3iuvvPKHINKeMfODGjdRgqlohQigdemEo5btc+hf2IKtTvuwnboYuA2FG7glSRh+W1a03iZ8kwMdzQHG8KcZyz/PGuf2d2DOs+O9KI3ajQTO1xuK4u4QeDVAwiRP2KDZzJo2bdrgegnStglmX5rVIQiW17M6jHfv1lt/s3yTA43kAEbifozTV/MEznsnnnYPcEE2Uh+tsruGzF20pM19uDrsvVQ2BMpTHu3meuA2KZMotJ6RdM5y32rgvge+Uy30Zba/iWvN4wBj+hDfeGZBvagRLZ90003DfbuUMpSGummXhoPAedIncOquKAMB0n4AguRtX0fZ99J0pLo2ip4m3iYHauUAAudbvnEsO2Wt+EPKyX/OJ3gQTkeE4CoKE1m9fQ+Td62vDR78OAZjOfalPtKAMFgd68NV6/u1dt159vqXnrO3jtBDcLgnWSHwTZgmBzqCAxI4HHpMzquLU9qLOSi5o5H0YDRehDbzjbw6ONW6BcFzZNl0BAmd748efW3eCZVsOPdOnbpv2cQl8RnBM7TR9TTxNznQCA5oSxUicHALOa0R9Sdx4qfzkDEwZ1aH4Lm5URpPZqUhVm+jqnUEn6I66LwjfOqp3mNb2qLDiGpW1ORADgcwD/T1jVlMAi91BhMxLuvUKvckmjnu9fsJpT1X06GiPqNHj746D5mEklS10ArLgEP1vBV/hd/5cH122V838sE03zc50GgOyAft/ZPPmuKrB/PBIT6YRry/4NxzT/bhxR/v1yzim/rgQt7nCh0qyj23Z1s1l1iOhu49sxrRdv5Ph2PfecvTyKDtYwijmjBNDtTKgfZxF07ExrhdXnnsOD/HfDCn1jrqKUcs1tu+bRbmlX6nn3nm5fXUY8tmTkqIONHnaXzMyJETINg38cugswoH3pjvEZPlc2aqy+O6IYQ3kX6iOCDD8Yr7HznY12hiCy/zwTTyPcrD7VIi8urgoGhkGYblVKEjL2K2VVf5GtlZWo6lC4PbqWg7b2TRSRqAHXxtaL5vcqBRHFDmA0IbfuHDj6lgal5Ig698Ge+l7RAPmSt0VM/lV1xxCtusKJ1GrU+q0Lli/PiqoMpkBYpUhdA3a624rHLEYeXR2tR0ymJ0E09hDhC8eQrbqm18BbW18sF0xPsQ247ZZl1aDz1VQkdajtQoH9Ihe+11nw+mI97LqKwg0I6oq1lHkwOhHOC0aldSrZzlg2fsvtpZtpwkbdJ2fFsslUE+HK1DJl/bst5XCR20nFN9yCDsmcGDBnVKLo402tB2fpJBc9OQ7OvM5vuGcCBE4Khi7JK/bggBNSLFTntdSFHkhPfEK0jo6CzeFwYvROz9nkQq/iWEuI6AIcz/7rR6SJORm3KjI2hr1vHJ40CUxTLAeCzOYM/J9U7uaO6R3vShkDq1G6olg4RwV2gCIbYcFSLtoWKwusyDEe4DOu//phDUtOl0mV765BCCLec/QlorswD5wDvFITCLPvJdLQrZYqn8zJkz9wxpZxImFjoKeyfjWL8QJL169Yqy/3Wlh8RGaWpqnCO2K9HapGXN5gBJ6I4OaSFZ/2bJ9SMEtqNgoKedncz8kPrIFnoscqNbCKwLEwudKXfffVhIulEV3mXnnXV7Q5d6MCjflnd83qWIbRKzxnJAOXI4sdoypIHcftIlM/UpgXsI/ciL/lzCMCgENlXocEXM/iGFlXoUe06XPC3CKHeL2wau6SgtXiSEN02YJgew5XwrlAvdtt9mXihsR8IV2cmQDtV70p2kvbt+UK4c1KrcPKq2IKrXHCRcR/IguC46MSmh24MLNwGbHCiBA2ytglNBtG21xXMlVFk6ip49ewb732GS8V7GkCp0CqpIXdY4yynW79hivYN6W1PmQgXmGQZFbVz71Te2wdD3MgL5f4v0rHLZUnZrlVF5/qwua+9urifZh5M55Z7uhjanZEx6VqOuP83flRjV766F7iJtzIJV4jTaru1FxV4fel4twkfhCbnvrAjN4PwUtG2Lp/pO8K8fvBMP7XgW/+ZL+0AYLIbeV4rWz9Zql/cOO87rDCialReKOl4oQn9HwWJMfka3tqBc9PLVKWdBnWIVSeoeaTrKGO9Dbt/jFDid47JQ8A6F0yAhp+wchM5eqpirbb6iv4p/McfnqzQ5E9uuVuB20+9cYyPwlZT/gopzZcXaeIuezf/n+BqiScKpxUmsdCM/2m2/rSkb28sYYC9D15PgugBHsMIqtbmaZAy4R4B7K3CvlUbPipZHoihlfER+JvqVsJ4t583E9VwFb5b52lDre+Xw1RGxDKjwcMVHS97YXvzkI01Tk3o1PHgRelaLHoTiPVl8UM4ZQgcuBU938B4AXJBRM4922VnEE3AOhLats2Dh378ZukXvK/TZbNNnQYGYCDPvJHXqXtnZoQ85PFOfBSsX3OArR8Fg+1QkdFCRdg0dcD032ywoc18ovrLhOMWaZITIKgWErrj0nP6sPrX4QtiV2mudJ5ft2X/bbb/TaUuqMJArvD5MzIN0ywVG79+EtFuaF4LsJ+D2Cr0EvrX1nTp7MdnObblm0plKYI/wGV+m8DFet6fD38NT2qNBGwte0WIE4jnQNI4JratU7oQXd9qyEl7g0inkuiH88cGYa10uAWeRvErRhIPebfWRjQZap5DV4FifpsbC1t9Hkyt0CsB2KCjt/JAwp9loMUGxi9iDlcAv+O6sSOiEnloJlv1el3EKTOsJBvEkftenpeW+yS1KnlRnj+XahRiQdzKJQvOgrEvmuFuYDEf6BE+UZW63/eIJ6baBVfh1HbcyaW9iK/CsedfKSrsjd7kfyUTRiu36YHWHxnPaps34LnjHlpEKEyE2jsl8Xg28FV3rQuOhfIbBv2FM6B9qSwa+/3EEzkrJzRrwq88VgvAzeH1oVnl4+P/MRXXWrUIar06epOVWPNB5SMv9j+yvCwJcIZmEQ4MODg2g7kUtXSKQKJPDwZpOUbtOd/ZjvdiPBfctl7EHG5mCkTYQUM5XDDAJSg1gDbBI3Wdwfb7eaiVwogGZeKhvCT+tyMihsg6T4TbdUZ21xWBCnwXM2Sn0tSs4EI3likhjubrqsgCpuHcaDemkpCu+JpQuJQT/rkToawtW+BFu8sNcC+4q7YZt053YRRZhF5lrjaTacqAB9JX9hEnd1+GJhM/a8O8IJvRBKz7Ofe0m0u8uIcpvwWq7GqOtdJ5mC//Og85bjc3rwyoBY7aKhnfuxPsUvLsV/C1ZgkftK8DQru5DFix0NKfkr8OYlPnC+3RnP9bPC/VPDGAMuPE9PrpLSx7MTPr+skMY+0deC1OZj8CZnBQ4DObbWbW/J4EgOwKD/48gTttyraVVnncV9h0zoa+HprRj19Ub3DFhQCSoxn4vt0dMm89mgjzNRKlKsqbtDYKnpRbBI4ED7RUCh4l8Zo7dSMbteDtp7CunOTjE308jjKpu7pCwkhANHX606Uzam7oVpW/ugs6zfDYi3ssHbQF03kX/zU3U3R38N8PX9qSmqnEle1sorV3VR8fSj6/O49hug26k0E7p3eXLdYV3UG6ttnffeadnKKMU6Lnxhhv+U98nJYGj9iqyl0l3xvqXnKU7gPKeqhXJJGaqEAzgGbbB1RcNtzYTJtWBGQInqktXJycrVYa5DD+PdgRO36JGaCbGZMql2uuM4CmUUoFJfYYrcNDoXhJd8PHnobYi2jA34tMlZ33LaIShwy8XTtqhtpBpQBI4LAYjfALHLSteq09T8K2tLXJy266TzoINKaJJFERdCnghTWzpW28FX9DXNmvOnOiE55P66E50HTGHtt8kZrrQhdfEBs9d9jcNSCaAd0ILly1jNKfUDHMSjGYFDiUzhlM5yqcZeqNTLtmOQpCaNp3rwK4ip+/BRSayWw/8mkL5f1dqh5z6g7IESBjSlrPT8Mj+hcA5pujxt3CZLWLa5FsnRUP2Hjgk6KvJXhXSV50Bs3Tp0s+G1qtOLSJx5W/Cie2a9ehC+pwWVfBHx+JsBf7Fwms1TAqENDtPEj84YlVcEz/LkxWB+FtpLPVwXIZj8NybhkP2JYTfRj78JBaPhapgJciKal7JOqRtrjV5wq5ZgifEoxzeaYucebqHYDsoVAtL0mf6JHV+6J0M1rZM0SyV2L26XCiR2/6NN9nkbd+YqPW9gjzloxL6FFK5QpF2Nhwr2jMhNOhIlwEe30kkG4Gr4Tg4olPBgKdVDmVM/KxTqj9plQ7A4wURrRlA3dnW5eZQEY0Iya1teUVH44g53VtpAICOoaXxZIDmajqGd7dRNlUwREbjGpOdawudJ8xEr07gHLqLLN4qtkbNpaVvvllI0wkYGjHIGsUop+FB7TIaTORDInsGxtOas+PL+Uwqf54hGz+jScC8W6SDsmB1UWFG+g9NnoPzXAt4X2FQ5Lj3iVq2Kzm0zUVAVGkrOsLOa7vhXapvlMrVk6tGDoo+vmOXK2VB8NWzpr0P2jOvaY1Otofj0xdz2hitYGxBtI9XPuboO9kKT82aeKjOs308Y+I+qZWaCZ21ymvS3O7DU+R9RvqPCEWWTUTvmFzHuvXoWLxIvSGwCPBLUrIEZI5PNJFhyVM0tx4lO6/V3iSN1t3+5tBfz/ypp2wIS7ssjBoetMp32RaUQJjicXxosOX8FJj1BCeXfhlCs8ooBox3uT4L8rcxK/U6aXjkW6STHh9dRd6zjdTxdeoj4aeYseRLHQXzW8V20cQsFanaC4sAfx9BfpILGPkVOcZ29x1OkEfkIYW/rtHbW39Fva++pjCOkEcOjPYpNI9wB/jEZkAoKm0LMTak17oCjCd7W3TKwGofbzGYHLmZ4XQsn3ViJFzya1EAZJ7BGU0oKKdJEf5Jo0OYZW7XZCRP4lPgKpO/Yr/OtmdAiPG5CG2CRVjfA32vOeVW8H/VmDMaYq63cdkCO60txqM5elU0YhxtuHRtsSi/y4QvEh5V9PSqTDq7DC6fpsMg7209mGWLYXL83ke8NCGO0vsruFE3keqj/yWM5NdiJnimwVkxZL46ir43PkqZR7VoMEEetdJAuj/y+OCi9fvgRZ8CQh247jZa3y2bMOBWoVWIiK+uvPf0b1CAQuLUM8gb19ZrsgTUQ2ajyxZSMIqER7WRH+fxRlPf1fF7bDptxpAaba0Y0HOtg6GvXcYR7iCOhbflsw1OcQfZuKeknSSJK/REzUdDkfcKSFVEe0gZTtxuKiGurVpgbL+NG9Et+1mF/wv0resz4CIMXMEV0pwKGNnqdPKVV9C4MsTe3p4xVJiGzi6A03DR9DDBQqro9koxFqk2iM5mUj31s5pm3jPN6t/PeA9HpyR5xtgsGhSW4Bqdo3CHJW980UNzcCcWbHuuU1pSg1FeGeUoSqljPcIEnsIxr2bbSRrdEspM+IuY1H/gI42ygg/01b/Au9yocScItiBr/gEub3WltUhDIJ+nFFeGVvj0pwIVFj1iL4C640HJwROckEzqffDgJsZCSY/WuCdvlcJ+8SUG+efUaJ2ulOGfwsTeN8/DknqWabKXzWhpCcQHbebBW3EELa2OPDhVgZEGh6LXz+D9sWyLrtcRda2e0y5NTHgZ7T9+EkGtPic8GeDL0jqgY5zi15SywjoqatFBMN6SpEvpIOBDsJdxiONj2f1fBB+RCl8KhSc8ag7t/3sofJsCu0KBDdwaJaHVpjxNxwocwZns/X8tyK8q8ID7uJTgqe56khUj7A7w0c6pUFXO25zLDCN0svFI+KD5zGfivYb2c34Un1Z/WpE03v1rXhvoo3km4NXX1KD3EjAIn1PYGu+vTyRwMh5tvYOQfgxUdJdRAHXHgmKiqQhc9tXenSTMmceoaYUXv/iiEvvUnc3NR1hHvg9dGSPDYXU6icKkBqxywatGaOUSAIQyhDgzVhm30e7uCq1H20YEkBKaRY+EEJNR46VdWoKxVbXW6kOj7IkeWjptMqt9JtDXy66CaTC8+BoAEKy16R68ItlEu3OdjNeRzW1QkcCuBjCiISil6YQElJVhKzANyJ0YOikjANQGodaiWbpl9P8qtJBvhjCPyVC1hUZzWIH2coErTEJwCUb2F2uDYULGNCCMlERrjvISsy27o0C4gi+wMthcENqGULiCxv9OE44h7SE8Knh7heJiE8mFoG7pznUyy9mTzcJeE3QF7+LFi5VY6Q9B2DsRiElysYzAkNDGCnQjanHmndEhmo5x1iukRmY1X3YiH2vcCeqDLfl9lOo0+ci+gaAY4TPihtKibas+5CXeX/Fs0ogU9oFn8kVZW0vZpEwe68xqOjNPjUkY92fa5U3zAExPnRQq9iyUZx0FZxJyBTsvorgUSrQWSVv2ZMERr0UMTB3FpGQ9Oh1iIJ/KxN2HzxBl/s+jJc+mY8spbKHE9nTZVU6TIaudHPv3TjjvlcYSCTPl+MHQ/Z7yOWcgXhUyoUsjqiAiCUtpb6HFGHehns+hKEuBw4QixSLoIZfyRBSXQnnTo/07Nzzcx55sVEgtRfOhhuAsG0YJldztEt6fuQIj5CqQyPejBHuObo1gtfYKHSc4U9sJm2bVbpt8Wy77Pm2rkYbDwrWhKcxpGftoapfIQAv9OxKVrqyJQZcz1tK3Cg9he9mHY+lv12BQ9/GmFpKCy8ipE97sF1LApGOty5ExpJ6iMEVMKEXtOaIlEjqHHHTQnZcPHHiq7rAJIbBIPtQQfGXD0Jn2LqgItc+DOMSmU3C/ntkkTSJdxZLXZm3lOClR5sEu9xjHyAM4nRpOJPbl7ulemcQycf+t7bkX5zHW+jqCJ0SgdJpNx4y1e0L5YG6PqMuRMbSuInCYUHYKhd9jjz0eDoW1cNGKK0Nh6LGX8qEWUb+KElQGPMe+R8UNJJbHt28OsemU7Dfjmzyh+XjKYFdNOHR3/Eb3Tf48YR1HopVNR1CWnrAfgbYtWlXw1SamIT7e1tTe0EIKXJW3cgh8kdsjQvCVBXPDpEnRBXC+B1vwbC51KHT6LZyxmn/k8OE3+Sqx72fOnLlnKGxnwGGoja8Ckd+GjwafTYcJpT1rmSuo7ziyzUR3+0jv9PcIn1vRyoZi79mCWLM+ePFerKBSPqVkntMRtLQq01Bdgpcr3BoRAV+UyeaCRm8xxunAtMh+b8EGAry+ZMmmrlzIq2rsmDG/qIWUWOgMHTp0hiRXCBIk4QkhcJ0BI38UNxdKSNiCJ8pczWj1aUtF2uozSkP/xkXwdQVY+PMRx94LOeU6DQ1oE4TQVkrarvzOTMLLEBbL5WldC61s4y425eyNoXloOlXTEWGKuVOSN19b6edNfcHGPhxlv1+4aNGu7Ga8l2/KCxmzTGZ6lzy6KgyaSK5LQhoBUX2QiD53+hBUpcMkcw2H2GJ8HV9v1HKykSHHujXcLlA6L4VQQhxN49Do8r8CcXfRNoMrgZX4HkF0MoJoIwTR5xFEu0SJ5omtCtWGmJxbqn5wKpL7b3kNdbXchjAkECle3P8I5cgpk8zKGIi+YWChV4wfM3LkBPrDzScUTFOF0EFyTQ7VdqZMnRp0J04wJSUAakuCx+q3LSoFDIZ4vgZoOiVQ9w8UIZkFMYYHG/NKJS6BDC/m3+vuLOVxJh3H2fXUpfgk+uNpCSK2ZPsgiHoo/Qea0JXKu5wrTJ5/OfJtCtgur6UTwnroLKOsAldp08s+XLr/3QfTke85nR7gq08y4rhRo67xwWW9rxA6WkmQYNeHIGOLdTyd6z36DcFVFoxii9wE4mgUXnuO6vZpOmXRZ/GgfS324eRkIzfGyFe+xPexsyATZGRo6ovQ+rUVQRMagwD6HIvEtKxyNtePPJjzcGtrqkj00PobCYe2E4eDZNUTOUjOX+Sd6I2k0+KeNm3aN7SL8dWFjLiuVi1HuKuExujRo/8TSebNWqdTrJmPPbanj8COfM/evyK5N96t1haQS0ZHazpmz5+/sr/0indfXSZvc7SDOMJc4RkI9r3LrNfFhfazH4InNYGWjK6C5X3edUERuqTLRKPo9eHVCV/ISZYvKZmvnrLeh2ytFL2AjPiveupM1VSuv/baoCz3p40bFxJAWA99wWVld2BSxFsSVPbzkcbLQhB0hv0El/8b82hjIA4tW6vIqk8nKDgsPqd4L/cuJ8GbYM24qGPUDWFtYRj6LcsWEo1VFojFeSlXI5jpD44qXHGBAgqx4XOZrqb22bnk4Cg5mIdeYSCNSP9aoEktaDmDcRD2bvWQDV4YX72pQoez94VXXnnlD32Fpe1Muumm3ATZPhxlvJcth8lQkUyKFUb3IQU9DGTv3jsIUQGgkJse0Cr2KYCyZlB8YW6I1HwCMgkMnaf0rA6yijScwG0XeitoLQSZq3LStlmxTxmCMDcdC1qRhEHRzHdB5ErQKMSGz1h4NZs+GpZXUI6NAVdXt2Av000jnfaEaDnIhB/U4peTbFSmTQZD0X+HbLMuv+KK/+AkqyEdHNoDdNipTIY4XsRcshYchNYZmk50u2XGrZu23azYvjQOoSzKhDP3sscTx1zdEjt8YUOpcv5qNF1pdUqBsY2gf8flNZyx0IMxEV+KWDeTHAS6I8zFh7d7ph3KwumGVt/V1YrgR1B2iqsEisPhaDlVeZTcdhJjdb1kQhm8zBQ6MirfO3WqN4ZE2s7pZ57pvZisDGLTcJhrZV2VfJXuUCpSX4CmU6ZjYEya5zpjXYJ3UCMSYVkCtH1DQ3RzAX/IdsCrPitEoZHaTlrfsR2NbTlGYOeGGyjvTtmOd+Y+93isIUh+F7qFh69HZV2fbNuLxpm75S4ypkNhpTCgOOQavKV8XHDuuafQVp9Ta1C1uadPRI++pb2eDxNS8piQ7ZgPT9H32gZwlKvTtviERbctFHXk6+jTK2cFvDVgBTy7KF9C4RnkE9EKell4hTSkZN1LdbZDWF3WKDtEWpIz3Az+6LZL1/h4tJ3N0XZyrwoK5ZOFQxtRnXE+H6VMCcURbbO4PhnB83pWGW1vlbcoFGcZcCgMl+c5A0rgyI6DLEjLk10TCd4jbzyVH0T9sm7omZVg0b46REDVRGVKId19xJ76QV7FF8TpAru8S/Cy6g6IvSpFwqfVbwyNmZqULsFjIFacypXBQ4zGvwG3u626K+Ne9tS2y+tbtqAyaHFxyD6HTabi5E6ezMmgXZ0A+ranCImfMk76lUGjNDt3a6WriOzNHqH4RTOCJzeZmmjuKMEjG43PeIzAGYUdp9Q7urxCRwwdOWLE7SGCR6EUIXChnZQFpy0VAkfRrT0sDANwSugReRJvQF6ThmyvRIc0i7yL+QSjFVZtrpdvKq+jcQTOFFfg6MZShN+oNPxoGJn5YYxAzMp9UxO5GGaH6mjeLczWSt6vVcmuoHm4b8uCc+Md9WpkRqOuSALnu3Axq/HRtUR3TOiXd3NERwgeCRy5x2TRiYbz5OzZs3cpw3CcrCNI6FjBE6LJIKBuldGJjs682L6m0fjxhFmfVeBnbKkm8VXG60j1V5wLA/A7cr2vBbfPr0P5bBtp5JOhES3twjzaafMU2n5WLe2zZXQcztH4vIQxdAWr7zB4tzwDt++492dlXUMj7ZV2VqR6UNIwJUZPo039LdrzeIIA2542P1Grbcxo1NraresscHcX1XJcGhE886D7QN0ukkW7BA+Lw11ljzvwtTI/b/QJHOy5QxshcKL5WmQQa6sl6ec71ZKN52uDBz+BkNqrCP48WK30DJ7Hzf3f61tYrdLE9AzMmTS5JDCoBmKfyN1HR3l+x11YiuU+ixgm1uk+wUPbzyYXz3NFJ5C2LAgG3dYwW+kiHBpWaNX1XBvj1fKimyBOPG1yPRqFBCJaiQII48ktOn3bERmV1QaP4NlBd3TppK7IeNSWSuUoE120aJ5VWVphEdyRMXzyhJ1062tWORnsGfN/LGuLKKWBeTk376RKCsP/PPDAV8u04STbV1NErqTl90ePvk7CxcdoxWkQSHrp4EGD7qMhhdId6PQBY+APOIk4ismyDXV9ik9Ms7ZUeLF6BxKD5zBd48pWQWERmkTddIG9DJbaIvA9KH8NAu4FVH2p2e3gco+S2wz+ubI9KOLax5es9yYBui9YsF1tx5B5GyEVz6cJDXi3gbyHRRdCocompFWWCT1UkeF5tDLg++hqmcD2fKgL6tjmjg815mu7Rx+PleBK9gPbzkPRKO4MqVuCGDrn+mDh2290akg/zUg7eZI2Dd/2YyG61OSDrgwVKkCTjxb7Xlf2+JLeQ/edcnit5Y52hM0Q/HBGMV/jPFNJ2uRprIBvmVJC6a4VriahYyuT5MQr+RehSd2Rojr2bCM96u+5cP2tvT6/pcL/7WlAG9scCZbu+IEcLGOiiaPSyZQ9nbL0fsCA/DYDcmpIw9EO/mJy/9q0nyHFisDEeBVFraDGIoWTsAjJwxn0vwzNyiejpviK09xTJul75NBnBHUVKfLFYQCfEUKn2V5U5dCW0R7Eq82JTlUTtILjb7MI4TwXweje/thKP/dS3mrlvpEjn5uKxCBqh4+7htDnVixtCXrOD70GRnwzd1Wp//RpN1vPtB3Aasbctxhzv6mnb7PKGtrPlXaTh98sfLfC1wWK4TPJ5SLa+XzwLgv10rfe2mLh00/3v3/GjP0I4FSqiopMmkn8Onk+ZNiwO3Ra3Yi2JXHWJXQsMhmPOes/hcYVClx7Z8evWhQ2RF70iHnSPNJoW6mVCvX2hFD/CFWA0FnGwI5PuRrJWDNZghPdZ9EiTYUt3U2+QVi0LUycg0OFtXDLiIoGUaENuRqmVH9tixLbtqJkxfA6kVIohE8Dy6sgUFsMplF2JdlgQjIWBCPNADRpYKVlfSEUl4nQ33zPt196kTmYeUV2Ep+Sqo/58Y8vUwRCaF1lwJUidESItlxT7r77MITPyTTce8WKyjhCJ68tkuIfyp/FeBoX1iKwN0w12yhpAL57k2rhq7V7tCJ0ejM4SztiNCvgz+UoWAthKiPfELaFN7DtuTR022Pr0vZHNzTY79IOiAiXRlrxyOaGdnYlk8V3R3tqM3QKxYnQSWx77q1ne+rQvR7btjPYmn8HmmrO/aQxJ2fTonyrta9sOZkE0PiPMOM2CN0mz6Yn1HcLs42aS2riuTj7nVzU3BFERABQaULHrQtj886kNB1E+gvZfFpThFC0HckROtJ2VilCFxV9gbERLAtoTyqICcqzwkZtTrZb35MGUxfGZ0y16rkyDNZ0guZrm2wWDMAjmUTiaTcmUm7oCZNYl9k9hf1iIhP5Pjmn+epIey+hgzHzeerbHJzPY/z8cpaWKYO10kqwxTlPUeHJo+8kfq3Q2t5A43WhtpuibRBN2GgOZAIfY+6lj90s0nBB01/4fSUCcIyxzzWkP0PbEZ043v/I4cqnLOfBvHJG6MQLoIVVlj8EzXzMGtN0CUM9aSlC6c6Da4jQcSuk07uRyH179ph9333nnR7cm6U8MW3sNb8+c/e9dRQpYSAh066MesYG8Dx71ddrnShlMKYr45Cxk8m9lYQn9hHdnRRtS43tpN3wrrTJQn06UWqnPwpdd6xy0Lm1uWolEuzmllTRuAR8uVkAG9EHRjCKd7Ihyhs7ja4PGlF3vThNv2+pPjc2MQXmiv51EKi7s716E+Gi07bVXA0zW1eGcxHe3M7SaOptb7N8kwNNDjQ50ORAkwNNDjQ50ORAkwNNDjQ50ORAkwNNDjQ50ORAkwNNDjQ50ORAkwNNDjQ50ORAkwON50DVkblCG9wL1DfeZJO3iceI8w0rjsO8X43r9G1J12m8k0dwNL4px3ULCRC9P9kEyu9D+Z05Ot/NHPd140rj64H9vYVVhPqEiRNH6zsXtN+Hx2Qc+0Oms89y59aRekf9t1C//CqiB/+gPvgHfcN8tdHRbdDyzB677/4QR7QrslhKnd2p8wfmvW1b6hW2tGFvtcHQ9wD0VXggw4OjDA8WpfFA5ZSx7YGHH94HV/UDTJ3dOOZ8nJSQV7sZ2gw/5Vti2xP5Gek4FNypNydktVEXJMI75UaKjolNXbk+SMbp80i1x/YZdD7BuHiLcVEREW76Jr4C2NSjkIJW01fxDRi062jhFB28u5l+1NXN0SM3C/riRJWj/2ck+WvhxEONBUOXfu6GL8rvdH+bHAx5/zneK4d3K/S+Cb3KTmDHSn/Gim62WEUd91OH4vJyH8IFxope0xcR38D7jokrdOnX+NVYsrB2nlkfsTaVg54bbYV23pgy+lmw3cz8m+ijTe/BcSw83cy0NfUqKcbuvmb+ajyl+qbBjwctz02fHurUH/mkif5devdeWIo3M67RSsxknd1Wy7HIbTDvded59N7Axq8ZLG3Av2zeVd2NDrwGaYzb/k+ZZ9w6zO2hERwd/SP3nSa0LZeMYuedhFEVfv1GHQvBm+kYZhLMx2WVbySro10egLcq5IHf5DUt/sSDPNEGTcxUOiXULawmn+FNFSy4K/K7hAxKk90xxqV7jvLKIcR7i29ZtGpAuuVN6pOsdlVcXQNeeW3bcVTRFgk6+w6aJXyqHvN7al3QtbkKaPFy6zF4I1zw7w5bR8httaYvns3ihZtHytSfSpsz5l8UfbZh0KNAy7S58YILl9dftq38fT5n7E7OaoP93b1sQVkl8uAVlR7CP5eequhqVorpOO59CS9iVdbCxVrXjp41yy0TS0eiVkdB4HRHE9I7i7NCi9JkYmWONBRNVPBeg7R8l5X+39Uo6kutI8k8AkXjFSWvAzQpWZFn4RV9ouJR+PQ2uZxHpZVTcJz7O+W+y/es+33iHDPikyZzIj+J5VGVFqEk2Mo55Aw2CXlpA3KYrAgfUZ5qeBXh4O9zxvFLX9ukbcD/PBZUvaNN33N/NDcAPJiGxCRwigWqBjJ99iu0ii8D3wqt/fMqF7yhN2pbz549k/3mjqOjGB83KAmccNJuLRJPq8/S6jD8viqDh9H9WAbPCmB/xfgdr+9oH1rAxktDQrOKVm8tavyfqtEm6o41A2h7BV5cDS8G0AfRmFafgvd+o/krZ40VIiuBiW6dpdwLhieRVpvQvOMxZQSiigju0TwNPUGjG8OY2j3M73t5oXCglfThQHgcXWhgFkg56rYpGNspHPcT9M+Hfikh7TbDhP5q3CIY+9WVQ1nSC8Tq+KqUBkoApHfux13xKLNE74w2ENNO5/7YlmGA7elyRFsb9zv4IrVbn6SmY7Sb6F2KphNrQUya+A4sZwVITdFAfRvb+hQEZ//PuuUiqQ0KPsED1VOlCQKzEbRIjbf0V2gaWomTvDCaVKbWlDqyUn40/LCahTSw6P9kfbao1dZMH1RpG2qv8VSOa3M1HVdjS6PRjC1Xo56f4Hdq/yvExtIu3rj9rHqkZZiwl7hay3OrUVstie/PmrEWxEanL+L0D67GldVmp1ymdmp3AcC+GERMCpDTziAcrnYPH+Nc2S5ql99uHnT4tiH1zXbm6fdD6c5K4pUXHmFX3nlUOlcVoUG4N2nae5IycZAO45dGbYvoTMaClOS2HdUPc3SvdbSKGCldxRuz79dKNI+o2/P5G6ldxv6RyUsNJiuYDxw27A8OYGq2PdlwbBJsbd+UFM1FrhU+JS6mSmtytwmhHX3F+PFR9j3RS7BfPEAI0q3KR6SJaNMhmCxzVyfrkS3NE8YQ8V/bkgwaIx5p4ksY6DpbxtEvLSy/pUY+Y4fZ08KQ/+UCbAoVW3Po+nMyYFRatcpoVddEQ+OL2s/v/1lwrNm+iPtXto2APrBzISRpnhaCaNuVw7usKi3+kHpajE3N4oovN0ggr9LW9R6+LSe74GALa8KbAlhRMHOgwRhP4IvOP3+MflNyZ2cfaONzKiaejJZ2paHz+8lQJW0I4VORhFv4jOYR0oAkQ+LvTLJTtQohDB61ajoCJfWaYQbhcaoMoTQburQfjjpN97VnEGHrWUXi6mFmQPdx7EBW8FbwwO1kjHUPhTQQmKguZXuT9qEP2d/mFc1FbbdDTLT/ZsC8bxcMtpVVF/otXLSor6UNdTwyVssoS38pFe3N2rrqr7Ghuc2I+a+FRQIFWp8xK3CyuXYcPck4ii52VButnclu7237bWHbV/oug3EID81V2ZGhmCwI4yRQtWDIgB1S3oGJhY4EvxY08MUJ14hzyjJGByf2lykAnmkxe4G/LzCmxhSkUeBBQieBt3AcJuNoGXRqu9WSNA3k0VyzpkMl/VipH2bwTTCdeSqd8Bn+t1nzKhit/R4T9DDXAKq9rk4NUq6vqYVpIsO1ExzNYLtKK6gmGMJtx7Ss9lLPgYnsE5yiRYZfVtBIOEk4GvUyycNY+wDnS9B/ggA0uI1mZYVOhVB0V4OePXrEp26eQeXaj3bWhFGbEGDaEgY9TORBaouAdRqkv3b11548KeSXvvlmbCC2NjQSQ20K7HDZMJSBTn8RWEMTBMTtlaDn04uPAlJTV0tTdqU0PjuOlBQOeta3QjGrrN4XiZaWbdL0aWQnMsI3REtxm2gXAF3V086ke88KRy1wObYh24d5fIjrMXyTHXJrY0ML6meAimhUwunO0RDBmEa/ezIXRKdP6ORNftsBx2sAaFAb9Th1wokaHa8xWEfoVMQ92dH1NbJ3BFFcmZYiKZ1jpsju4qywrUuXLv1cGn5XXcewOkL2LHf1d9875SuYD/3X2C2Z4UHqqoFRUBHA0YM2UaXh5bVfbZHglB1LthNW6aA0nsJJu0Za3GiAp8lu5Q5mu720MAiaWCByvBoZGhGSSzWxEqd6mZNIcBLoohdNRkfNyaeCR2z5xtLGJ5UGBR5ekcULu0XOWRBSixptJ7LpUc8iHeEHjrdUMOGw22tpfHmJzkFg51GeNhHBgPNluWTwGarjbfgypgCdRQWAS0+QQHRp0WmwXcycNhYg1wG1xuK0fbVjZJYRKXrSjkqNsTXGmjTu6YVrkHWPb6W6UvdiQNIM0jJqRkZG+eW4LTRbDvsuMoxpYAhWkzbNaGjUw9igaXHbv1Z9dOuB7usMzpgHrqHWlrWrt8MnGY6jupyVPLeTLH2mzsIdqjabuvLaODc5mBw6FyUNxhafu3CYcRC3L3lYkCTcLAjq39ifhP47LMn/pBbMd9ljorYU5Yk9JJDAKMzIj8dSdAiQbLcPl5lHKhefWibL8E6+cBoXL8v1xIcz7T1lI1cN/r4WUt41gksRSCuTMCRXGIvNAhT1RZZrQxrOqsZJOLB1+ooB7sag7Zko6CbDil6hHj9gBJULWiHVOa48QZ1lTheEdyOA4/o5Uo2PLWVQZUWLjLnagtGg0Wq8WVGio1IJpRSnMbfOyBhn7U4y4LKCXuYSKEFnJbUGv4SnbFP6ayeD3huh6hatMtjJoJni21PBA20jrPYF3r4SusKtDpdGYGxckauC80Q46JMBRtMZolMS1xCfN8AwXg9RXYIRfWqf+GjaeIN+13t30OnY104s3u2EbWG2Vl+dLqmcxef2X5IGNKTepl1atYekjCN7YhmPAY6d73CFkMFZwUPl8rV1MTaONf22l/ghGrV91xjL4EkhQ2sKDktLUCJ/p7ytNy9rpYVZPfOxx8Sz/c1n36wTxhT6Yl5Sdh+jLe0vuyk40gzFIXacGEbmAaO9DtF8t9odY/o5bLaRsb6mxwy2eFU0mkKMy9hkqlZqMQZYnSTYVSiyj9jHdUxLrrwpAkvak5zkMlfntONJ1znQfe+2yTXAur8nj8cTR8wV3p2OJlh1BO+2LWUCyWta25W8dsUnAuKdXV2TZfg93qrldbTVTFU+2UajjdiVqsIZ0jh6Rkf/WR8zFuLqjbaaCp8UyHasJLUGsxjFOJIuE6qMegbl0QWO1PSkzth1E8UHzxOrNYOn0I0JlIucCimXafgGRgcYqbwLXWDc+ZfElXY4Y3hrdwZZmo5+z9OSn3PdRUKYWSWxlXGMVXUPU3il8qmyssW4ZJeQJsTvC93fZdRjMIzGEPgrgFcB96TrvIYB82HTaW1aKU1HtMrJSqcISUc3hQ+I2dggzqG+L1NmC8q8RL1/xOB7XVp4AbaIN4GRj8JHaE6xXYJ98U/A8TU1AnvNgfyxYR3yoJbT3ePJe36kuUgdp1yU6dBlpuHB1yi3wOWBYGS/gAfj+bdVcMl2gVe+IRugdV0N7t0ov6NUasGD71FOQCoEGb9JpbfZFe2q067fk3UnO1zbVLSUAVLv5diXbCM8fEiTXnSwiu1O+dgZUoZSyvdVOAInRjpdUtrZHcQvQ+sT8HW02z5pq2YroVVVAzVyNlN/yBHUpU/pM/m+rhw4XRw6EdHiwanQeYIn3EMTtuLRAYb8Shgb4zQWDV2vWB5uvOGGWbcaqL+XJMd0En/Wd/U379aTY18Rx0zT1k/nOXTKsI3aeZJ4YvimkB3ZRz+QPS2ERs1J4OTjpnvh5Ciok+QVGt/w5H+TOMRbM/Zks4tDVBJwMnUIb4WsAOeTciQ26U8LXbn0/wEs5g160p77egAAAABJRU5ErkJggg==';

  /* =========================================================
     STATE
  ========================================================== */
  var STATE = {
    loading: true,
    authView: 'login',
    authError: '',
    authInfo: '',
    session: null,
    profile: null,
    activeTab: null,
    profiles: [], benefits: [], rejectReasons: [], claims: [], notifications: [], invites: [],
    toast: null, modal: null,
    rejectingClaimId: null,
    editingClaimId: null,
    confirmDeleteClaimId: null,
    claimFormError: null,
    editingAllocId: null,
    confirmDeactivateId: null,
    confirmRevokeInvite: null,
    staffRoleFilter: 'all',
    historyFilter: 'all',
    reportMonth: null, reportYear: null,
    _realtimeSubscribed: false
  };

  /* =========================================================
     UTILITIES
  ========================================================== */
  function fmtMoney(n){ n = isFinite(n)?n:0; var neg = n<0; n=Math.abs(n); var s='$'+n.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}); return neg? '-'+s : s; }
  function fmtDate(d){ if(!d) return '-'; var dt=new Date(d+'T00:00:00'); if(isNaN(dt)) return d; return dt.toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'}); }
  function fmtDateTime(iso){ if(!iso) return '-'; var dt=new Date(iso); if(isNaN(dt)) return iso; return dt.toLocaleString(undefined,{year:'numeric',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}); }
  function escapeHtml(str){ return String(str==null?'':str).replace(/[&<>"']/g, function(s){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]; }); }
  function todayStr(){ return new Date().toISOString().slice(0,10); }
  function isImageName(name){ return /\.(png|jpe?g|gif|webp|heic|heif|bmp)$/i.test(name||''); }

  function profileById(id){ return STATE.profiles.filter(function(p){ return p.id===id; })[0]; }
  function employeeName(id){ var p = profileById(id); return p ? p.name : 'Unknown'; }

  function vendorSuggestions(){
    var seen = {}; var list = [];
    STATE.claims.forEach(function(c){
      var v = c.vendor && c.vendor.trim();
      if(v && !seen[v.toLowerCase()]){ seen[v.toLowerCase()]=true; list.push(v); }
    });
    return list.sort(function(a,b){ return a.localeCompare(b); });
  }
  function renderVendorDatalist(id){
    return '<datalist id="'+id+'">'+vendorSuggestions().map(function(v){ return '<option value="'+escapeHtml(v)+'"></option>'; }).join('')+'</datalist>';
  }

  function captureClaimFormValues(){
    var form = document.querySelector('form[data-form="submit-claim"]');
    if(!form) return null;
    return {
      category: form.category ? form.category.value : '',
      vendor: form.vendor ? form.vendor.value : '',
      amount: form.amount ? form.amount.value : '',
      receiptDate: form.receiptDate ? form.receiptDate.value : ''
    };
  }
  function restoreClaimFormValues(vals){
    var form = document.querySelector('form[data-form="submit-claim"]');
    if(!form || !vals) return;
    if(form.category && vals.category){ form.category.value = vals.category; }
    if(form.vendor && vals.vendor){ form.vendor.value = vals.vendor; }
    if(form.amount && vals.amount){ form.amount.value = vals.amount; }
    if(form.receiptDate && vals.receiptDate){ form.receiptDate.value = vals.receiptDate; }
  }

  /* =========================================================
     BUSINESS LOGIC
  ========================================================== */
  function computeWallet(employeeId){
    var profile = profileById(employeeId) || {annual_allocation:0};
    var empClaims = STATE.claims.filter(function(c){ return c.employee_id===employeeId; });
    var approvedTotal=0, pendingTotal=0;
    var byCategory = {};
    STATE.benefits.forEach(function(b){ byCategory[b] = {approved:0, pending:0}; });
    empClaims.forEach(function(c){
      if(!byCategory[c.category]) byCategory[c.category] = {approved:0, pending:0};
      if(c.status==='approved'){ approvedTotal+=Number(c.amount); byCategory[c.category].approved+=Number(c.amount); }
      if(c.status==='pending'){ pendingTotal+=Number(c.amount); byCategory[c.category].pending+=Number(c.amount); }
    });
    var allocation = Number(profile.annual_allocation)||0;
    var available = allocation - approvedTotal - pendingTotal;
    var utilizationPct = allocation>0 ? Math.min(100, (approvedTotal/allocation)*100) : 0;
    return {allocation:allocation, approvedTotal:approvedTotal, pendingTotal:pendingTotal, available:available, utilizationPct:utilizationPct, byCategory:byCategory};
  }

  function buildMonthlyReport(claims, year, month){
    var filtered = claims.filter(function(c){
      if(c.status!=='approved') return false;
      var d = new Date(c.receipt_date+'T00:00:00');
      return d.getFullYear()===year && d.getMonth()===month;
    });
    var byCategory={}, byEmployee={}, totalClaimed=0;
    filtered.forEach(function(c){
      var amt = Number(c.amount);
      totalClaimed+=amt;
      byCategory[c.category] = byCategory[c.category]||{count:0,total:0};
      byCategory[c.category].count++; byCategory[c.category].total+=amt;
      byEmployee[c.employee_id] = byEmployee[c.employee_id]||{count:0,total:0,name:employeeName(c.employee_id)};
      byEmployee[c.employee_id].count++; byEmployee[c.employee_id].total+=amt;
    });
    return {byCategory:byCategory, byEmployee:byEmployee, totalClaimed:totalClaimed, totalCount:filtered.length};
  }

  function uniqueYearsFromClaims(claims, currentYear){
    var years = {}; years[currentYear]=true;
    claims.forEach(function(c){ if(c.receipt_date){ years[new Date(c.receipt_date+'T00:00:00').getFullYear()]=true; } });
    return Object.keys(years).map(Number).sort(function(a,b){ return b-a; });
  }

  /* =========================================================
     AUTH + DATA LOADING
  ========================================================== */
  function loadProfileAndData(){
    return supabase.from('profiles').select('*').eq('id', STATE.session.user.id).single().then(function(res){
      if(res.error || !res.data){ throw new Error('Could not load your account. If you just signed up, make sure your admin invited this exact email.'); }
      if(!res.data.active){
        return supabase.auth.signOut().then(function(){
          STATE.authError = 'This account has been deactivated. Contact your administrator.';
          throw new Error('deactivated');
        });
      }
      STATE.profile = res.data;
      return loadAppData();
    });
  }

  function loadAppData(){
    var isAdmin = STATE.profile && STATE.profile.role === 'admin';
    var calls = [
      supabase.from('benefits').select('*').order('name'),
      supabase.from('reject_reasons').select('*').order('reason'),
      supabase.from('claims').select('*').order('submitted_at', {ascending:false}),
      supabase.from('notifications').select('*').order('created_at', {ascending:false})
    ];
    if(isAdmin){
      calls.push(supabase.from('profiles').select('*').order('name'));
      calls.push(supabase.from('invites').select('*').order('created_at', {ascending:false}));
    }
    return Promise.all(calls).then(function(results){
      STATE.benefits = (results[0].data||[]).map(function(b){ return b.name; });
      STATE.rejectReasons = (results[1].data||[]).map(function(r){ return r.reason; });
      STATE.claims = results[2].data || [];
      STATE.notifications = results[3].data || [];
      if(isAdmin){
        STATE.profiles = results[4].data || [];
        STATE.invites = results[5].data || [];
      } else {
        STATE.profiles = STATE.profile ? [STATE.profile] : [];
        STATE.invites = [];
      }
    });
  }

  function subscribeRealtime(){
    if(STATE._realtimeSubscribed || !supabase) return;
    STATE._realtimeSubscribed = true;
    ['claims','benefits','notifications','profiles'].forEach(function(table){
      supabase.channel(table+'-rt')
        .on('postgres_changes', {event:'*', schema:'public', table:table}, handleRealtimeChange)
        .subscribe();
    });
  }

  var realtimeDebounceTimer = null;
  function handleRealtimeChange(){
    clearTimeout(realtimeDebounceTimer);
    realtimeDebounceTimer = setTimeout(function(){
      if(!STATE.profile) return;
      loadAppData().then(function(){
        var activeEl = document.activeElement;
        var isTyping = activeEl && ['INPUT','TEXTAREA'].indexOf(activeEl.tagName)!==-1;
        if(!isTyping){
          var preserved = STATE.activeTab==='claim' ? captureClaimFormValues() : null;
          render();
          if(preserved){ restoreClaimFormValues(preserved); }
        }
      }).catch(function(err){ console.error('realtime refresh failed', err); });
    }, 400);
  }

  function init(){
    if(!supabase){ STATE.loading = false; render(); return; }
    STATE.loading = true; render();
    supabase.auth.getSession().then(function(res){
      STATE.session = res.data.session;
      return STATE.session ? loadProfileAndData() : null;
    }).then(function(){
      STATE.loading = false;
      if(STATE.profile){ STATE.activeTab = STATE.profile.role==='admin' ? 'approvals' : 'dashboard'; }
      render();
      if(STATE.profile){ subscribeRealtime(); }
    }).catch(function(err){
      console.error(err);
      STATE.session = null; STATE.profile = null; STATE.loading = false;
      render();
    });

    supabase.auth.onAuthStateChange(function(event, session){
      if(event === 'SIGNED_OUT'){
        STATE.session = null; STATE.profile = null; STATE.activeTab = null;
        render();
      }
    });
  }

  /* =========================================================
     RENDER - TOP LEVEL
  ========================================================== */
  function render(){
    var app = document.getElementById('app');
    if(!supabase){ app.innerHTML = renderSetupNeeded(); return; }
    if(STATE.loading){ app.innerHTML = renderLoading() + renderBrandFooter(); return; }
    if(!STATE.session || !STATE.profile){ app.innerHTML = renderAuthScreen() + renderBrandFooter(); return; }
    app.innerHTML = (STATE.profile.role==='admin' ? renderAdminShell() : renderUserShell()) + renderBrandFooter();
    if(STATE.modal){
      var host = document.createElement('div');
      host.innerHTML = renderModal();
      if(host.firstElementChild) app.appendChild(host.firstElementChild);
    }
    if(STATE.toast){
      var thost = document.createElement('div');
      thost.innerHTML = renderToast();
      if(thost.firstElementChild) app.appendChild(thost.firstElementChild);
    }
  }

  function renderSetupNeeded(){
    return '<div class="login-wrap"><div class="login-card" style="max-width:460px;">'+
      '<div class="login-brand"><div class="login-logo">FB</div><h1>Setup needed</h1>'+
      '<p class="muted">This copy isn\'t connected to a Supabase project yet.</p></div>'+
      '<div class="info-banner">Open <code>config.js</code> and fill in your Supabase project URL and anon key '+
      '(found in your Supabase dashboard under Settings &rarr; API), then reload this page.</div>'+
    '</div></div>';
  }

  function renderLoading(){
    return '<div class="loading-wrap"><div class="spinner"></div><div>Loading your benefits portal...</div></div>';
  }

  function renderBrandFooter(){
    return '<div class="brand-footer"><span>Powered by</span><img src="'+CRESCO_LOGO_DATA_URI+'" alt="Cresco Insurance Agency Pte Ltd" /></div>';
  }

  function renderToast(){
    if(!STATE.toast) return '';
    return '<div class="toast toast-'+STATE.toast.type+'">'+escapeHtml(STATE.toast.msg)+'</div>';
  }
  function showToast(msg, type){
    STATE.toast = {msg:msg, type:type||'success'};
    render();
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function(){ STATE.toast=null; render(); }, 3200);
  }

  function renderModal(){
    if(!STATE.modal) return '';
    var m = STATE.modal;
    return '<div class="modal-overlay" data-action="close-modal">'+
      '<div class="modal-box" onclick="event.stopPropagation()">'+
        '<div class="modal-header"><span>'+escapeHtml(m.title)+'</span><button class="link-btn" data-action="close-modal">Close</button></div>'+
        '<div class="modal-body">'+
          (m.isImage ? '<img src="'+m.src+'" class="modal-img" alt="Receipt"/>' : '<a href="'+m.src+'" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Open '+escapeHtml(m.name)+'</a>')+
        '</div>'+
      '</div>'+
    '</div>';
  }

  /* =========================================================
     AUTH VIEWS
  ========================================================== */
  function renderAuthScreen(){
    return STATE.authView === 'signup' ? renderSignup() : renderLogin();
  }

  function renderLogin(){
    return '<div class="login-wrap"><div class="login-card">'+
      '<div class="login-brand"><div class="login-logo">FB</div><h1>Flex Benefits Portal</h1><p class="muted">Manage your employee benefits wallet</p></div>'+
      '<form data-form="login" class="login-form">'+
        '<label>Email<input type="email" name="email" autocomplete="username" required placeholder="you@company.com" /></label>'+
        '<label>Password<input type="password" name="password" autocomplete="current-password" required placeholder="********" /></label>'+
        (STATE.authError ? '<div class="field-error">'+escapeHtml(STATE.authError)+'</div>' : '')+
        (STATE.authInfo ? '<div class="info-banner banner-success">'+escapeHtml(STATE.authInfo)+'</div>' : '')+
        '<button type="submit" class="btn btn-primary btn-block">Log in</button>'+
      '</form>'+
      '<div class="auth-toggle">'+
        '<button data-action="show-signup">Accept an invite</button>'+
        '<button data-action="forgot-password">Forgot password?</button>'+
      '</div>'+
    '</div></div>';
  }

  function renderSignup(){
    return '<div class="login-wrap"><div class="login-card">'+
      '<div class="login-brand"><div class="login-logo">FB</div><h1>Accept Your Invite</h1><p class="muted">Your admin needs to invite your email first</p></div>'+
      '<form data-form="signup" class="login-form">'+
        '<label>Work Email<input type="email" name="email" autocomplete="username" required placeholder="you@company.com" /></label>'+
        '<label>Choose a Password<input type="password" name="password" autocomplete="new-password" required minlength="6" placeholder="At least 6 characters" /></label>'+
        '<label>Confirm Password<input type="password" name="confirmPassword" autocomplete="new-password" required placeholder="Repeat your password" /></label>'+
        (STATE.authError ? '<div class="field-error">'+escapeHtml(STATE.authError)+'</div>' : '')+
        (STATE.authInfo ? '<div class="info-banner banner-success">'+escapeHtml(STATE.authInfo)+'</div>' : '')+
        '<button type="submit" class="btn btn-primary btn-block">Create Account</button>'+
      '</form>'+
      '<div class="auth-toggle"><button data-action="show-login">Already have an account? Log in</button></div>'+
    '</div></div>';
  }

  /* =========================================================
     SHARED: TOPBAR / NAV TAB
  ========================================================== */
  function renderTopbar(){
    return '<div class="topbar">'+
      '<div class="brand-mini"><span class="login-logo small">FB</span> Flex Benefits Portal</div>'+
      '<div class="topbar-right"><span class="user-chip">'+escapeHtml(STATE.profile.name)+' <span class="role-tag">'+STATE.profile.role+'</span></span>'+
      '<button class="btn btn-ghost btn-sm" data-action="logout">Log out</button></div>'+
    '</div>';
  }
  function navTab(tab, label){
    return '<button class="tab '+(STATE.activeTab===tab?'active':'')+'" data-action="nav" data-tab="'+tab+'">'+label+'</button>';
  }

  /* =========================================================
     USER MODULE
  ========================================================== */
  function renderUserShell(){
    var wallet = computeWallet(STATE.profile.id);
    var unread = STATE.notifications.filter(function(n){ return !n.read; }).length;
    return '<div class="shell">'+renderTopbar()+
      '<div class="tabs">'+
        navTab('dashboard','Dashboard')+
        navTab('claim','Submit Claim')+
        navTab('history','Transaction History')+
        navTab('notifications','Notifications'+(unread?' <span class="badge">'+unread+'</span>':''))+
        '<button class="tab tab-cta" data-action="buy-pa">BUY PA NOW</button>'+
      '</div>'+
      '<div class="content">'+
        (STATE.activeTab==='claim' ? renderClaimForm() :
         STATE.activeTab==='history' ? renderUserHistory() :
         STATE.activeTab==='notifications' ? renderUserNotifications() :
         renderUserDashboard(wallet))+
      '</div></div>';
  }

  function renderUserDashboard(wallet){
    var categories = STATE.benefits;
    var maxCat = 1;
    categories.forEach(function(c){ var v=(wallet.byCategory[c]?wallet.byCategory[c].approved+wallet.byCategory[c].pending:0); if(v>maxCat) maxCat=v; });
    var recent = STATE.claims.slice().sort(function(a,b){ return b.submitted_at.localeCompare(a.submitted_at); }).slice(0,5);
    var barsHtml = categories.map(function(c,i){
      var cat = wallet.byCategory[c]||{approved:0,pending:0};
      var val = cat.approved+cat.pending;
      var pct = (val/maxCat)*100;
      return '<div class="bar-row"><div class="bar-label">'+escapeHtml(c)+'</div>'+
        '<div class="bar-track"><div class="bar-fill cat-'+(i%5)+'" style="width:'+pct+'%"></div></div>'+
        '<div class="bar-value">'+fmtMoney(val)+'</div></div>';
    }).join('');
    return ''+
    '<div class="grid-cards">'+
      '<div class="card stat"><div class="stat-label">Annual Allocation</div><div class="stat-value">'+fmtMoney(wallet.allocation)+'</div></div>'+
      '<div class="card stat"><div class="stat-label">Used (Approved)</div><div class="stat-value">'+fmtMoney(wallet.approvedTotal)+'</div></div>'+
      '<div class="card stat"><div class="stat-label">Pending Review</div><div class="stat-value">'+fmtMoney(wallet.pendingTotal)+'</div></div>'+
      '<div class="card stat highlight"><div class="stat-label">Available Balance</div><div class="stat-value">'+fmtMoney(wallet.available)+'</div></div>'+
    '</div>'+
    '<div class="card"><div class="card-title">Utilisation Level</div>'+
      '<div class="progress-track"><div class="progress-fill" style="width:'+wallet.utilizationPct+'%"></div></div>'+
      '<div class="muted small">'+wallet.utilizationPct.toFixed(1)+'% of annual allocation used</div></div>'+
    '<div class="card"><div class="card-title">Spend by Benefit Category</div><div class="bar-chart">'+barsHtml+'</div></div>'+
    '<div class="card"><div class="card-title">Recent Submissions</div>'+renderClaimsTable(recent,false,false,false)+'</div>';
  }

  function renderClaimForm(){
    var wallet = computeWallet(STATE.profile.id);
    return '<div class="card"><div class="card-title">Submit a New Claim</div>'+
      '<form data-form="submit-claim" class="claim-form">'+
        '<label>Benefit Category<select name="category" required><option value="">Select a category...</option>'+
          STATE.benefits.map(function(b){ return '<option value="'+escapeHtml(b)+'">'+escapeHtml(b)+'</option>'; }).join('')+
        '</select></label>'+
        '<label>Vendor / Merchant<input type="text" name="vendor" list="vendor-options-new" required placeholder="e.g. California Fitness" autocomplete="off" /></label>'+
        renderVendorDatalist('vendor-options-new')+
        '<label>Amount to Claim (SGD)<input type="number" id="claim-amount-input" name="amount" step="0.01" min="0.01" required placeholder="e.g. 120.00" /></label>'+
        '<div class="muted small">Available balance: '+fmtMoney(wallet.available)+'</div>'+
        '<div id="claim-amount-live-error" class="field-error" style="display:none;"></div>'+
        '<label>Date of Receipt<input type="date" name="receiptDate" required max="'+todayStr()+'" /></label>'+
        '<label>Upload Receipt (photo or PDF, max 4MB)<input type="file" name="receipt" accept="image/*,.pdf" required /></label>'+
        (STATE.claimFormError ? '<div class="field-error">'+escapeHtml(STATE.claimFormError)+'</div>' : '')+
        '<div class="field-hint">Only Gym membership, Health screening, Optical, Dental and Leisure travel are claimable. Other expenses, including petrol, cannot be reimbursed through this wallet.</div>'+
        '<button type="submit" class="btn btn-primary">Submit Claim</button>'+
      '</form></div>';
  }

  function renderUserHistory(){
    var claims = STATE.claims.slice();
    var filter = STATE.historyFilter||'all';
    if(filter!=='all') claims = claims.filter(function(c){ return c.status===filter; });
    claims.sort(function(a,b){ return b.submitted_at.localeCompare(a.submitted_at); });
    var filters = ['all','pending','approved','rejected'];
    return '<div class="card"><div class="card-title">Transaction History</div>'+
      '<div class="muted small" style="margin-bottom:12px;">Pending and rejected claims can be edited or deleted. Approved claims are locked.</div>'+
      '<div class="filter-row">'+filters.map(function(f){ return '<button class="chip-filter '+(filter===f?'active':'')+'" data-action="filter-history" data-filter="'+f+'">'+(f.charAt(0).toUpperCase()+f.slice(1))+'</button>'; }).join('')+'</div>'+
      renderClaimsTable(claims,false,false,true)+
    '</div>';
  }

  function renderUserNotifications(){
    var notifs = STATE.notifications.slice().sort(function(a,b){ return b.created_at.localeCompare(a.created_at); });
    if(!notifs.length) return '<div class="card"><div class="card-title">Notifications</div><div class="empty-state">No notifications yet.</div></div>';
    return '<div class="card"><div class="card-title">Notifications</div><div class="notif-list">'+
      notifs.map(function(n){
        return '<div class="notif-item '+(n.read?'':'unread')+'"><div>'+escapeHtml(n.message)+'</div>'+
          '<div class="tiny muted">'+fmtDateTime(n.created_at)+'</div>'+
          (!n.read ? '<button class="link-btn" data-action="mark-read" data-id="'+n.id+'">Mark as read</button>' : '')+
        '</div>';
      }).join('')+
    '</div></div>';
  }

  /* =========================================================
     SHARED: CLAIMS TABLE
  ========================================================== */
  function renderClaimsTable(claims, showEmployee, adminActions, userActions){
    if(!claims.length) return '<div class="empty-state">No submissions found.</div>';
    var colCount = 6 + (showEmployee?1:0) + (adminActions?1:0) + (userActions?1:0);
    var rows = claims.map(function(c){
      var row = '<tr>'+
        (showEmployee ? '<td>'+escapeHtml(employeeName(c.employee_id))+'</td>' : '')+
        '<td>'+escapeHtml(c.category)+'</td>'+
        '<td>'+escapeHtml(c.vendor||'-')+'</td>'+
        '<td>'+fmtMoney(c.amount)+'</td>'+
        '<td>'+fmtDate(c.receipt_date)+'</td>'+
        '<td><span class="status-pill status-'+c.status+'">'+c.status+'</span>'+
          (c.status==='rejected' && c.reject_reason ? '<div class="tiny muted">'+escapeHtml(c.reject_reason)+'</div>' : '')+
        '</td>'+
        '<td>'+(c.receipt_path ? '<button class="link-btn" data-action="view-receipt" data-id="'+c.id+'">View</button>' : '-')+'</td>'+
        (adminActions ? (c.status==='pending' ? renderApprovalActions(c) : '<td> - </td>') : '')+
        (userActions ? renderUserActionsCell(c) : '')+
      '</tr>';
      var expandRow = '';
      if(adminActions && STATE.rejectingClaimId===c.id){
        expandRow = '<tr class="reject-row"><td colspan="'+colCount+'">'+renderRejectPanel(c)+'</td></tr>';
      } else if(userActions && STATE.editingClaimId===c.id){
        expandRow = '<tr class="reject-row"><td colspan="'+colCount+'">'+renderClaimEditPanel(c)+'</td></tr>';
      }
      return row+expandRow;
    }).join('');
    return '<div class="table-wrap"><table class="data-table"><thead><tr>'+
      (showEmployee?'<th>Employee</th>':'')+
      '<th>Category</th><th>Vendor</th><th>Amount</th><th>Receipt Date</th><th>Status</th><th>Receipt</th>'+
      (adminActions?'<th>Actions</th>':'')+
      (userActions?'<th>Actions</th>':'')+
    '</tr></thead><tbody>'+rows+'</tbody></table></div>';
  }

  function renderApprovalActions(c){
    return '<td class="actions-cell">'+
      '<button class="btn btn-sm btn-success" data-action="approve-claim" data-id="'+c.id+'">Approve</button>'+
      '<button class="btn btn-sm btn-danger" data-action="start-reject" data-id="'+c.id+'">Reject</button>'+
    '</td>';
  }

  function renderUserActionsCell(c){
    if(STATE.confirmDeleteClaimId===c.id){
      return '<td class="actions-cell">'+
        '<button class="btn btn-sm btn-danger" data-action="delete-claim-confirm" data-id="'+c.id+'">Confirm?</button> '+
        '<button class="btn btn-sm btn-ghost" data-action="delete-claim-cancel" data-id="'+c.id+'">Cancel</button>'+
      '</td>';
    }
    if(c.status==='pending' || c.status==='rejected'){
      return '<td class="actions-cell">'+
        '<button class="btn btn-sm btn-ghost" data-action="start-edit-claim" data-id="'+c.id+'">Edit</button> '+
        '<button class="btn btn-sm btn-danger" data-action="delete-claim" data-id="'+c.id+'">Delete</button>'+
      '</td>';
    }
    return '<td> - </td>';
  }

  function renderRejectPanel(c){
    return '<div class="reject-panel">'+
      '<label>Rejection Reason<select data-field="reject-reason-'+c.id+'"><option value="">Select a reason...</option>'+
        STATE.rejectReasons.map(function(r){ return '<option value="'+escapeHtml(r)+'">'+escapeHtml(r)+'</option>'; }).join('')+
      '</select></label>'+
      '<label>Additional Note (optional)<input type="text" data-field="reject-note-'+c.id+'" placeholder="Add more detail..." /></label>'+
      '<div class="reject-actions">'+
        '<button class="btn btn-sm btn-danger" data-action="confirm-reject" data-id="'+c.id+'">Confirm Reject</button>'+
        '<button class="btn btn-sm btn-ghost" data-action="cancel-reject" data-id="'+c.id+'">Cancel</button>'+
      '</div></div>';
  }

  function renderClaimEditPanel(c){
    return '<div class="reject-panel">'+
      '<label>Benefit Category<select id="edit-category-'+c.id+'">'+
        STATE.benefits.map(function(b){ return '<option value="'+escapeHtml(b)+'" '+(b===c.category?'selected':'')+'>'+escapeHtml(b)+'</option>'; }).join('')+
      '</select></label>'+
      '<label>Vendor / Merchant<input type="text" id="edit-vendor-'+c.id+'" list="vendor-options-'+c.id+'" value="'+escapeHtml(c.vendor||'')+'" autocomplete="off"/></label>'+
      renderVendorDatalist('vendor-options-'+c.id)+
      '<label>Amount<input type="number" id="edit-amount-'+c.id+'" step="0.01" min="0.01" value="'+c.amount+'"/></label>'+
      '<div id="edit-amount-live-error-'+c.id+'" class="field-error" style="display:none;"></div>'+
      '<label>Receipt Date<input type="date" id="edit-date-'+c.id+'" value="'+c.receipt_date+'" max="'+todayStr()+'"/></label>'+
      '<label>Replace Receipt (optional)<input type="file" id="edit-receipt-'+c.id+'" accept="image/*,.pdf"/></label>'+
      (STATE.claimFormError ? '<div class="field-error">'+escapeHtml(STATE.claimFormError)+'</div>' : '')+
      (c.status==='rejected' ? '<div class="field-hint">Saving will resubmit this claim for review.</div>' : '')+
      '<div class="reject-actions">'+
        '<button class="btn btn-sm btn-primary" data-action="confirm-edit-claim" data-id="'+c.id+'">Save Changes</button>'+
        '<button class="btn btn-sm btn-ghost" data-action="cancel-edit-claim" data-id="'+c.id+'">Cancel</button>'+
      '</div></div>';
  }

  /* =========================================================
     ADMIN MODULE
  ========================================================== */
  function renderAdminShell(){
    var pendingCount = STATE.claims.filter(function(c){ return c.status==='pending'; }).length;
    var tab = STATE.activeTab || 'approvals';
    return '<div class="shell">'+renderTopbar()+
      '<div class="tabs">'+
        navTab('approvals','Pending Approvals'+(pendingCount?' <span class="badge">'+pendingCount+'</span>':''))+
        navTab('all','All Submissions')+
        navTab('staff','Staff Management')+
        navTab('benefits','Benefit Categories')+
        navTab('access','User Access')+
        navTab('reports','Reports')+
      '</div>'+
      '<div class="content">'+
        (tab==='all' ? renderAdminAllSubmissions() :
         tab==='staff' ? renderAdminStaff() :
         tab==='benefits' ? renderAdminBenefits() :
         tab==='access' ? renderAdminAccess() :
         tab==='reports' ? renderAdminReports() :
         renderAdminApprovals())+
      '</div></div>';
  }

  function renderAdminApprovals(){
    var pending = STATE.claims.filter(function(c){ return c.status==='pending'; }).sort(function(a,b){ return a.submitted_at.localeCompare(b.submitted_at); });
    return '<div class="card"><div class="card-title">Pending Approvals'+(pending.length?' <span class="badge">'+pending.length+'</span>':'')+'</div>'+renderClaimsTable(pending,true,true,false)+'</div>';
  }

  function renderAdminAllSubmissions(){
    var claims = STATE.claims.slice().sort(function(a,b){ return b.submitted_at.localeCompare(a.submitted_at); });
    return '<div class="card"><div class="card-title">All Submissions</div>'+renderClaimsTable(claims,true,false,false)+'</div>';
  }

  function renderAdminStaff(){
    var roleFilter = STATE.staffRoleFilter || 'all';
    var visibleProfiles = STATE.profiles.filter(function(p){ return roleFilter==='all' || p.role===roleFilter; });
    var staffRows = visibleProfiles.map(function(p){
      var allocCell = STATE.editingAllocId===p.id
        ? '<input type="number" min="0" step="1" style="width:90px" id="alloc-input-'+p.id+'" value="'+p.annual_allocation+'"/> <button class="btn btn-sm btn-primary" data-action="save-alloc" data-id="'+p.id+'">Save</button>'
        : fmtMoney(p.annual_allocation)+' <button class="link-btn" data-action="edit-alloc" data-id="'+p.id+'">Edit</button>';
      var actionsCell = STATE.confirmDeactivateId===p.id
        ? '<button class="btn btn-sm btn-danger" data-action="toggle-active-confirm" data-id="'+p.id+'">Confirm?</button> <button class="btn btn-sm btn-ghost" data-action="toggle-active-cancel" data-id="'+p.id+'">Cancel</button>'
        : '<button class="btn btn-sm btn-ghost" data-action="toggle-active" data-id="'+p.id+'">'+(p.active?'Deactivate':'Activate')+'</button>';
      var roleLabel = p.role==='admin' ? 'Admin' : 'User';
      return '<tr><td>'+escapeHtml(p.name)+'</td><td>'+escapeHtml(p.email)+'</td>'+
        '<td><span class="role-chip">'+roleLabel+'</span></td>'+
        '<td>'+allocCell+'</td>'+
        '<td><span class="status-pill '+(p.active?'status-approved':'status-rejected')+'">'+(p.active?'Active':'Inactive')+'</span></td>'+
        '<td class="actions-cell">'+actionsCell+'</td></tr>';
    }).join('');
    var staffFilters = [{key:'all',label:'All'},{key:'user',label:'User'},{key:'admin',label:'Admin'}];

    var pendingInvites = STATE.invites.filter(function(i){ return !i.used; });
    var inviteRows = pendingInvites.map(function(i){
      return '<tr><td>'+escapeHtml(i.name)+'</td><td>'+escapeHtml(i.email)+'</td><td>'+fmtMoney(i.annual_allocation)+'</td>'+
        '<td>'+fmtDateTime(i.created_at)+'</td>'+
        '<td>'+(STATE.confirmRevokeInvite===i.email
          ? '<button class="btn btn-sm btn-danger" data-action="revoke-invite-confirm" data-email="'+escapeHtml(i.email)+'">Confirm?</button> <button class="btn btn-sm btn-ghost" data-action="revoke-invite-cancel">Cancel</button>'
          : '<button class="btn btn-sm btn-ghost" data-action="revoke-invite" data-email="'+escapeHtml(i.email)+'">Revoke</button>')+
        '</td></tr>';
    }).join('');

    return ''+
    '<div class="card"><div class="card-title">Invite Staff Member</div>'+
      '<form data-form="invite-staff" class="inline-form">'+
        '<label class="mini-field">Full Name<input type="text" name="name" placeholder="e.g. Jane Lim" required /></label>'+
        '<label class="mini-field">Work Email<input type="email" name="email" placeholder="jane@company.com" required /></label>'+
        '<label class="mini-field">Annual Allocation<input type="number" name="annualAllocation" value="1000" min="0" step="1" style="width:140px" /></label>'+
        '<button type="submit" class="btn btn-primary">Send Invite</button>'+
      '</form>'+
      '<div class="field-hint">New staff are invited as Users. To grant Admin access, use the User Access tab after they\'ve signed up.</div>'+
    '</div>'+
    '<div class="card"><div class="card-title">Bulk Invite (CSV)</div>'+
      '<div class="muted small" style="margin-bottom:10px;">Columns: name,email,annualAllocation. First row is treated as a header and skipped.</div>'+
      '<input type="file" id="staff-csv-input" accept=".csv" /></div>'+
    (pendingInvites.length ? '<div class="card"><div class="card-title">Pending Invites</div><div class="table-wrap"><table class="data-table">'+
      '<thead><tr><th>Name</th><th>Email</th><th>Allocation</th><th>Invited</th><th>Actions</th></tr></thead>'+
      '<tbody>'+inviteRows+'</tbody></table></div></div>' : '')+
    '<div class="card"><div class="card-title">Staff Directory</div>'+
      '<div class="filter-row">'+staffFilters.map(function(f){ return '<button class="chip-filter '+(roleFilter===f.key?'active':'')+'" data-action="filter-staff" data-filter="'+f.key+'">'+f.label+'</button>'; }).join('')+'</div>'+
      '<div class="table-wrap"><table class="data-table">'+
      '<thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Annual Allocation</th><th>Status</th><th>Actions</th></tr></thead>'+
      '<tbody>'+staffRows+'</tbody></table></div>'+
      '<div class="field-hint">Permanently deleting an account (not just deactivating it) requires the Supabase dashboard, since it needs elevated access this app intentionally doesn\'t have.</div>'+
    '</div>';
  }

  function renderAdminBenefits(){
    return '<div class="card"><div class="card-title">Add Benefit Category</div>'+
      '<form data-form="add-benefit" class="inline-form">'+
        '<input type="text" name="category" placeholder="e.g. Wellness" required />'+
        '<button type="submit" class="btn btn-primary">Add Category</button>'+
      '</form></div>'+
      '<div class="card"><div class="card-title">Current Benefit Categories</div>'+
      '<div class="chip-list">'+STATE.benefits.map(function(b){ return '<span class="chip">'+escapeHtml(b)+' <button class="chip-remove" data-action="remove-benefit" data-cat="'+escapeHtml(b)+'">x</button></span>'; }).join('')+'</div>'+
      '<div class="field-hint">Removing a category only affects future claims - historical submissions keep their original category.</div></div>';
  }

  function renderAdminAccess(){
    var rows = STATE.profiles.map(function(p){
      return '<tr><td>'+escapeHtml(p.name)+'</td><td>'+escapeHtml(p.email)+'</td>'+
        '<td><select data-action="change-role" data-id="'+p.id+'"><option value="user" '+(p.role==='user'?'selected':'')+'>User</option><option value="admin" '+(p.role==='admin'?'selected':'')+'>Admin</option></select></td>'+
        '<td><button class="btn btn-sm btn-ghost" data-action="toggle-active" data-id="'+p.id+'">'+(p.active?'Deactivate':'Activate')+'</button></td>'+
      '</tr>';
    }).join('');
    return '<div class="card"><div class="card-title">User Access Rights</div><div class="table-wrap"><table class="data-table">'+
      '<thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th></tr></thead>'+
      '<tbody>'+rows+'</tbody></table></div>'+
      '<div class="field-hint">Password resets are self-service - staff use "Forgot password?" on the login screen.</div></div>';
  }

  function renderAdminReports(){
    var now = new Date();
    var y = STATE.reportYear || now.getFullYear();
    var m = (STATE.reportMonth!=null) ? STATE.reportMonth : now.getMonth();
    var report = buildMonthlyReport(STATE.claims, y, m);
    var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var years = uniqueYearsFromClaims(STATE.claims, now.getFullYear());
    var catRows = STATE.benefits.map(function(b){
      var r = report.byCategory[b]||{count:0,total:0};
      return '<tr><td>'+escapeHtml(b)+'</td><td>'+r.count+'</td><td>'+fmtMoney(r.total)+'</td></tr>';
    }).join('');
    var empRows = STATE.profiles.filter(function(p){ return p.role==='user'; }).map(function(p){
      var r = report.byEmployee[p.id]||{count:0,total:0};
      var pct = p.annual_allocation>0 ? (r.total/p.annual_allocation*100) : 0;
      return '<tr><td>'+escapeHtml(p.name)+'</td><td>'+r.count+'</td><td>'+fmtMoney(r.total)+'</td><td>'+fmtMoney(p.annual_allocation)+'</td><td>'+pct.toFixed(1)+'%</td></tr>';
    }).join('');
    return ''+
    '<div class="card"><div class="card-title">Monthly Utilisation Report</div>'+
      '<div class="report-controls">'+
        '<select data-action="set-report-month">'+monthNames.map(function(mn,i){ return '<option value="'+i+'" '+(i===m?'selected':'')+'>'+mn+'</option>'; }).join('')+'</select>'+
        '<select data-action="set-report-year">'+years.map(function(yr){ return '<option value="'+yr+'" '+(yr===y?'selected':'')+'>'+yr+'</option>'; }).join('')+'</select>'+
        '<button class="btn btn-ghost btn-sm" data-action="export-report">Export to Excel</button>'+
      '</div>'+
      '<div class="report-summary">Total claimed (approved): <strong>'+fmtMoney(report.totalClaimed)+'</strong> across <strong>'+report.totalCount+'</strong> submission(s).</div>'+
    '</div>'+
    '<div class="card"><div class="card-title">By Benefit Category</div><div class="table-wrap"><table class="data-table">'+
      '<thead><tr><th>Category</th><th># Claims</th><th>Total Amount</th></tr></thead><tbody>'+catRows+'</tbody></table></div></div>'+
    '<div class="card"><div class="card-title">By Employee</div><div class="table-wrap"><table class="data-table">'+
      '<thead><tr><th>Employee</th><th># Claims</th><th>Total Amount</th><th>Annual Allocation</th><th>Utilisation %</th></tr></thead><tbody>'+empRows+'</tbody></table></div></div>';
  }

  function exportReportExcel(){
    if(typeof XLSX==='undefined'){ showToast('Excel export library did not load (needs an internet connection).', 'error'); return; }
    var now = new Date();
    var y = STATE.reportYear || now.getFullYear();
    var m = (STATE.reportMonth!=null) ? STATE.reportMonth : now.getMonth();
    var report = buildMonthlyReport(STATE.claims, y, m);
    var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    var summaryData = [['Monthly Utilisation Report'],[monthNames[m]+' '+y],[],
      ['Total Claimed (Approved)', Number(report.totalClaimed.toFixed(2))],
      ['Total Submissions', report.totalCount]];
    var catData = [['Category','Number of Claims','Total Amount']];
    STATE.benefits.forEach(function(b){ var r=report.byCategory[b]||{count:0,total:0}; catData.push([b, r.count, Number(r.total.toFixed(2))]); });
    var empData = [['Employee','Number of Claims','Total Amount','Annual Allocation','Utilisation %']];
    STATE.profiles.filter(function(p){ return p.role==='user'; }).forEach(function(p){
      var r = report.byEmployee[p.id]||{count:0,total:0};
      var pct = p.annual_allocation>0 ? (r.total/p.annual_allocation*100) : 0;
      empData.push([p.name, r.count, Number(r.total.toFixed(2)), Number(p.annual_allocation), Number(pct.toFixed(1))]);
    });

    try{
      var wb = XLSX.utils.book_new();
      var wsSummary = XLSX.utils.aoa_to_sheet(summaryData); wsSummary['!cols']=[{wch:28},{wch:16}];
      var wsCat = XLSX.utils.aoa_to_sheet(catData); wsCat['!cols']=[{wch:24},{wch:16},{wch:14}];
      var wsEmp = XLSX.utils.aoa_to_sheet(empData); wsEmp['!cols']=[{wch:24},{wch:16},{wch:14},{wch:16},{wch:14}];
      XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');
      XLSX.utils.book_append_sheet(wb, wsCat, 'By Category');
      XLSX.utils.book_append_sheet(wb, wsEmp, 'By Employee');
      XLSX.writeFile(wb, 'utilisation-report-'+y+'-'+String(m+1).padStart(2,'0')+'.xlsx');
    }catch(err){
      console.error(err);
      showToast('Something went wrong building the Excel file.', 'error');
    }
  }

  /* =========================================================
     ACTION HANDLERS - AUTH
  ========================================================== */
  function doLogin(form){
    var email = form.email.value.trim();
    var password = form.password.value;
    var btn = form.querySelector('button[type=submit]');
    btn.disabled = true; btn.textContent = 'Logging in...';
    return supabase.auth.signInWithPassword({email:email, password:password}).then(function(res){
      if(res.error){ STATE.authError = res.error.message; render(); return; }
      STATE.authError=''; STATE.authInfo=''; STATE.session = res.data.session;
      STATE.loading = true; render();
      return loadProfileAndData().then(function(){
        STATE.loading=false;
        STATE.activeTab = STATE.profile.role==='admin' ? 'approvals' : 'dashboard';
        render();
        subscribeRealtime();
      }).catch(function(err){
        STATE.loading=false; STATE.session=null; STATE.profile=null;
        if(err.message!=='deactivated'){ STATE.authError = err.message; }
        render();
      });
    });
  }

  function doSignup(form){
    var email = form.email.value.trim();
    var password = form.password.value;
    var confirmPassword = form.confirmPassword.value;
    if(password !== confirmPassword){ STATE.authError='Passwords do not match.'; render(); return Promise.resolve(); }
    if(password.length < 6){ STATE.authError='Password must be at least 6 characters.'; render(); return Promise.resolve(); }
    var btn = form.querySelector('button[type=submit]');
    btn.disabled = true; btn.textContent = 'Creating account...';
    return supabase.auth.signUp({email:email, password:password}).then(function(res){
      if(res.error){ STATE.authError = res.error.message; render(); return; }
      if(res.data.session){
        STATE.session = res.data.session;
        STATE.loading = true; render();
        return loadProfileAndData().then(function(){
          STATE.loading=false;
          STATE.activeTab = STATE.profile.role==='admin' ? 'approvals' : 'dashboard';
          render();
          subscribeRealtime();
        });
      }
      STATE.authView='login'; STATE.authError='';
      STATE.authInfo='Account created! Check your email to confirm, then log in.';
      render();
    });
  }

  function handleForgotPassword(){
    var emailInput = document.querySelector('form[data-form="login"] input[name="email"]');
    var email = emailInput ? emailInput.value.trim() : '';
    if(!email){ showToast('Enter your email above first, then click "Forgot password?".', 'error'); return Promise.resolve(); }
    return supabase.auth.resetPasswordForEmail(email).then(function(res){
      if(res.error){ showToast('Could not send reset email: '+res.error.message, 'error'); return; }
      showToast('Password reset email sent - check your inbox.', 'success');
    });
  }

  /* =========================================================
     ACTION HANDLERS - CLAIMS
  ========================================================== */
  function openReceiptModal(id){
    var claim = STATE.claims.filter(function(c){ return c.id===id; })[0];
    if(!claim || !claim.receipt_path) return;
    supabase.storage.from('receipts').createSignedUrl(claim.receipt_path, 120).then(function(res){
      if(res.error){ showToast('Could not load receipt.', 'error'); return; }
      STATE.modal = {type:'image', src:res.data.signedUrl, title:claim.category+' - '+fmtDate(claim.receipt_date), isImage:isImageName(claim.receipt_name), name:claim.receipt_name};
      render();
    });
  }

  function uploadReceipt(file){
    var ext = (file.name.split('.').pop()||'bin').toLowerCase();
    var path = STATE.session.user.id + '/' + Date.now() + '-' + Math.random().toString(36).slice(2,8) + '.' + ext;
    return supabase.storage.from('receipts').upload(path, file).then(function(res){
      if(res.error) throw res.error;
      return {path:path, name:file.name};
    });
  }

  function submitClaim(form){
    var category = form.category.value;
    var vendor = form.vendor.value.trim();
    var amount = parseFloat(form.amount.value);
    var receiptDate = form.receiptDate.value;
    var file = form.receipt.files[0];
    if(!category || !vendor || !amount || amount<=0 || !receiptDate || !file){ showToast('Please complete all fields.', 'error'); return Promise.resolve(); }
    if(file.size > 4*1024*1024){ showToast('File too large - please upload a file under 4MB.', 'error'); return Promise.resolve(); }

    var wallet = computeWallet(STATE.profile.id);
    if(amount > wallet.available){
      STATE.claimFormError = 'You can only claim up to '+fmtMoney(wallet.available)+' based on your available Flex wallet balance.';
      render();
      return Promise.resolve();
    }
    STATE.claimFormError = null;

    var btn = form.querySelector('button[type=submit]');
    btn.disabled = true; btn.textContent = 'Uploading...';
    return uploadReceipt(file).then(function(receipt){
      return supabase.from('claims').insert({
        employee_id: STATE.session.user.id, category:category, vendor:vendor, amount:amount,
        receipt_date:receiptDate, receipt_path:receipt.path, receipt_name:receipt.name, status:'pending'
      });
    }).then(function(res){
      if(res.error) throw res.error;
      showToast('Claim submitted successfully and is pending review.', 'success');
      STATE.activeTab = 'history';
      return loadAppData();
    }).then(function(){ render(); }).catch(function(err){
      console.error(err);
      showToast('Something went wrong: '+(err.message||err), 'error');
      render();
    });
  }

  function approveClaim(id){
    return supabase.from('claims').update({status:'approved', decided_at:new Date().toISOString()}).eq('id', id).then(function(res){
      if(res.error){ showToast('Could not approve claim: '+res.error.message, 'error'); return; }
      showToast('Claim approved.', 'success');
      return loadAppData();
    }).then(function(){ render(); });
  }

  function confirmReject(id){
    var reasonSel = document.querySelector('[data-field="reject-reason-'+id+'"]');
    var noteInput = document.querySelector('[data-field="reject-note-'+id+'"]');
    var reason = reasonSel ? reasonSel.value : '';
    if(!reason){ showToast('Please select a rejection reason.', 'error'); return Promise.resolve(); }
    var note = noteInput ? noteInput.value.trim() : '';
    return supabase.from('claims').update({status:'rejected', reject_reason:reason, admin_note:note, decided_at:new Date().toISOString()}).eq('id', id).then(function(res){
      if(res.error){ showToast('Could not reject claim: '+res.error.message, 'error'); return; }
      STATE.rejectingClaimId = null;
      showToast('Claim rejected and employee notified.', 'success');
      return loadAppData();
    }).then(function(){ render(); });
  }

  function markNotificationRead(id){
    return supabase.from('notifications').update({read:true}).eq('id', id).then(function(res){
      if(res.error) return;
      return loadAppData();
    }).then(function(){ render(); });
  }

  function confirmEditClaim(id){
    var claim = STATE.claims.filter(function(c){ return c.id===id; })[0];
    if(!claim) return Promise.resolve();
    if(claim.employee_id !== STATE.session.user.id){ showToast('You can only edit your own claims.', 'error'); return Promise.resolve(); }
    if(claim.status==='approved'){ showToast('Approved claims cannot be edited.', 'error'); return Promise.resolve(); }

    var catSel = document.getElementById('edit-category-'+id);
    var vendorInput = document.getElementById('edit-vendor-'+id);
    var amtInput = document.getElementById('edit-amount-'+id);
    var dateInput = document.getElementById('edit-date-'+id);
    var fileInput = document.getElementById('edit-receipt-'+id);
    var category = catSel ? catSel.value : claim.category;
    var vendor = vendorInput ? vendorInput.value.trim() : claim.vendor;
    var amount = amtInput ? parseFloat(amtInput.value) : claim.amount;
    var receiptDate = dateInput ? dateInput.value : claim.receipt_date;
    if(!category || !vendor || !amount || amount<=0 || !receiptDate){ showToast('Please complete all fields.', 'error'); return Promise.resolve(); }

    var wallet = computeWallet(STATE.profile.id);
    var availableForThisEdit = claim.status==='pending' ? wallet.available + Number(claim.amount) : wallet.available;
    if(amount > availableForThisEdit){
      STATE.claimFormError = 'You can only claim up to '+fmtMoney(availableForThisEdit)+' based on your available Flex wallet balance.';
      render();
      return Promise.resolve();
    }
    STATE.claimFormError = null;

    var file = fileInput && fileInput.files && fileInput.files[0];
    var wasRejected = claim.status === 'rejected';

    var updates = {category:category, vendor:vendor, amount:amount, receipt_date:receiptDate, last_edited_at:new Date().toISOString()};
    if(wasRejected){ updates.status='pending'; updates.reject_reason=null; updates.admin_note=null; updates.decided_at=null; }

    function applyUpdate(){
      return supabase.from('claims').update(updates).eq('id', id).then(function(res){
        if(res.error){ showToast('Could not save changes: '+res.error.message, 'error'); return; }
        STATE.editingClaimId = null;
        showToast(wasRejected ? 'Claim updated and resubmitted for review.' : 'Claim updated.', 'success');
        return loadAppData();
      }).then(function(){ render(); });
    }

    if(file){
      if(file.size > 4*1024*1024){ showToast('File too large - please upload a file under 4MB.', 'error'); return Promise.resolve(); }
      return uploadReceipt(file).then(function(receipt){
        updates.receipt_path = receipt.path; updates.receipt_name = receipt.name;
        return applyUpdate();
      }).catch(function(err){ showToast('Upload failed: '+(err.message||err), 'error'); });
    }
    return applyUpdate();
  }

  function deleteClaimConfirmed(id){
    var claim = STATE.claims.filter(function(c){ return c.id===id; })[0];
    STATE.confirmDeleteClaimId = null;
    if(!claim){ render(); return Promise.resolve(); }
    if(claim.employee_id !== STATE.session.user.id){ showToast('You can only delete your own claims.', 'error'); render(); return Promise.resolve(); }
    if(claim.status==='approved'){ showToast('Approved claims cannot be deleted.', 'error'); render(); return Promise.resolve(); }
    return supabase.from('claims').delete().eq('id', id).then(function(res){
      if(res.error){ showToast('Could not delete claim: '+res.error.message, 'error'); return; }
      showToast('Claim deleted.', 'success');
      return loadAppData();
    }).then(function(){ render(); });
  }

  /* =========================================================
     ACTION HANDLERS - ADMIN: STAFF / INVITES / BENEFITS / ACCESS
  ========================================================== */
  function inviteStaff(form){
    var name = form.name.value.trim();
    var email = form.email.value.trim().toLowerCase();
    var alloc = parseFloat(form.annualAllocation.value) || 0;
    if(!name || !email){ showToast('Please complete all fields.', 'error'); return Promise.resolve(); }
    return supabase.from('invites').upsert(
      {email:email, name:name, role:'user', annual_allocation:alloc, invited_by:STATE.session.user.id, used:false},
      {onConflict:'email'}
    ).then(function(res){
      if(res.error){ showToast('Could not send invite: '+res.error.message, 'error'); return; }
      showToast('Invite created for '+email+'.', 'success');
      form.reset();
      return loadAppData();
    }).then(function(){ render(); });
  }

  function handleStaffCsv(file){
    if(!file) return Promise.resolve();
    return file.text().then(function(text){
      var lines = text.split(/\r?\n/).map(function(l){ return l.trim(); }).filter(Boolean);
      if(lines.length<2){ showToast('CSV appears to be empty.', 'error'); return; }
      var rows = [];
      for(var i=1;i<lines.length;i++){
        var parts = lines[i].split(',').map(function(p){ return p.trim(); });
        if(parts.length<2) continue;
        var name=parts[0], email=(parts[1]||'').toLowerCase(), alloc=parseFloat(parts[2])||1000;
        if(!name || !email) continue;
        rows.push({email:email, name:name, role:'user', annual_allocation:alloc, invited_by:STATE.session.user.id, used:false});
      }
      if(!rows.length){ showToast('No valid rows found in that CSV.', 'error'); return; }
      return supabase.from('invites').upsert(rows, {onConflict:'email'}).then(function(res){
        if(res.error){ showToast('Bulk invite failed: '+res.error.message, 'error'); return; }
        showToast(rows.length+' invite(s) created or updated.', 'success');
        return loadAppData();
      });
    }).then(function(){ render(); }).catch(function(){ showToast('Could not read that CSV file.', 'error'); });
  }

  function revokeInviteConfirmed(email){
    STATE.confirmRevokeInvite = null;
    return supabase.from('invites').delete().eq('email', email).then(function(res){
      if(res.error){ showToast('Could not revoke invite: '+res.error.message, 'error'); return; }
      showToast('Invite revoked.', 'success');
      return loadAppData();
    }).then(function(){ render(); });
  }

  function toggleActiveConfirmed(id){
    STATE.confirmDeactivateId = null;
    var p = profileById(id);
    if(!p) return Promise.resolve();
    if(p.id === STATE.profile.id){ showToast('You cannot deactivate your own account.', 'error'); render(); return Promise.resolve(); }
    return supabase.from('profiles').update({active: !p.active}).eq('id', id).then(function(res){
      if(res.error){ showToast('Could not update status: '+res.error.message, 'error'); return; }
      showToast(p.name+(!p.active?' activated.':' deactivated.'), 'success');
      return loadAppData();
    }).then(function(){ render(); });
  }

  function changeRole(id, role){
    var p = profileById(id);
    if(!p) return Promise.resolve();
    if(p.role==='admin' && role==='user'){
      var adminCount = STATE.profiles.filter(function(x){ return x.role==='admin' && x.active; }).length;
      if(adminCount<=1){ showToast('At least one active admin is required.', 'error'); render(); return Promise.resolve(); }
    }
    return supabase.from('profiles').update({role:role}).eq('id', id).then(function(res){
      if(res.error){ showToast('Could not update role: '+res.error.message, 'error'); return; }
      showToast('Role updated.', 'success');
      return loadAppData();
    }).then(function(){ render(); });
  }

  function saveAlloc(id){
    var input = document.getElementById('alloc-input-'+id);
    var val = input ? parseFloat(input.value) : NaN;
    if(isNaN(val) || val<0){ showToast('Please enter a valid allocation amount.', 'error'); return Promise.resolve(); }
    STATE.editingAllocId = null;
    return supabase.from('profiles').update({annual_allocation:val}).eq('id', id).then(function(res){
      if(res.error){ showToast('Could not update allocation: '+res.error.message, 'error'); return; }
      showToast('Allocation updated.', 'success');
      return loadAppData();
    }).then(function(){ render(); });
  }

  function addBenefit(form){
    var cat = form.category.value.trim();
    if(!cat) return Promise.resolve();
    if(STATE.benefits.some(function(b){ return b.toLowerCase()===cat.toLowerCase(); })){ showToast('That category already exists.', 'error'); return Promise.resolve(); }
    return supabase.from('benefits').insert({name:cat}).then(function(res){
      if(res.error){ showToast('Could not add category: '+res.error.message, 'error'); return; }
      showToast('Benefit category added.', 'success');
      return loadAppData();
    }).then(function(){ render(); });
  }

  function removeBenefit(name){
    return supabase.from('benefits').delete().eq('name', name).then(function(res){
      if(res.error){ showToast('Could not remove category: '+res.error.message, 'error'); return; }
      showToast('Category removed.', 'success');
      return loadAppData();
    }).then(function(){ render(); });
  }

  /* =========================================================
     EVENT DISPATCH
  ========================================================== */
  function handleClick(e){
    var btn = e.target.closest('[data-action]');
    if(!btn) return Promise.resolve();
    var action = btn.dataset.action;
    var id = btn.dataset.id;
    switch(action){
      case 'show-signup': STATE.authView='signup'; STATE.authError=''; STATE.authInfo=''; render(); return Promise.resolve();
      case 'show-login': STATE.authView='login'; STATE.authError=''; STATE.authInfo=''; render(); return Promise.resolve();
      case 'forgot-password': return handleForgotPassword();
      case 'nav': STATE.activeTab = btn.dataset.tab; STATE.claimFormError=null; render(); return Promise.resolve();
      case 'logout': return supabase.auth.signOut();
      case 'buy-pa': window.open('https://insure.aia.com.sg/aianow3/solitaire?f=43519&i=agy', '_blank', 'noopener,noreferrer'); return Promise.resolve();
      case 'view-receipt': openReceiptModal(id); return Promise.resolve();
      case 'close-modal': STATE.modal=null; render(); return Promise.resolve();
      case 'approve-claim': return approveClaim(id);
      case 'start-reject': STATE.rejectingClaimId=id; render(); return Promise.resolve();
      case 'cancel-reject': STATE.rejectingClaimId=null; render(); return Promise.resolve();
      case 'confirm-reject': return confirmReject(id);
      case 'mark-read': return markNotificationRead(id);
      case 'start-edit-claim': STATE.editingClaimId=id; STATE.confirmDeleteClaimId=null; STATE.claimFormError=null; render(); return Promise.resolve();
      case 'cancel-edit-claim': STATE.editingClaimId=null; STATE.claimFormError=null; render(); return Promise.resolve();
      case 'confirm-edit-claim': return confirmEditClaim(id);
      case 'delete-claim': STATE.confirmDeleteClaimId=id; STATE.editingClaimId=null; render(); return Promise.resolve();
      case 'delete-claim-cancel': STATE.confirmDeleteClaimId=null; render(); return Promise.resolve();
      case 'delete-claim-confirm': return deleteClaimConfirmed(id);
      case 'edit-alloc': STATE.editingAllocId=id; render(); return Promise.resolve();
      case 'save-alloc': return saveAlloc(id);
      case 'toggle-active': STATE.confirmDeactivateId=id; render(); return Promise.resolve();
      case 'toggle-active-cancel': STATE.confirmDeactivateId=null; render(); return Promise.resolve();
      case 'toggle-active-confirm': return toggleActiveConfirmed(id);
      case 'revoke-invite': STATE.confirmRevokeInvite=btn.dataset.email; render(); return Promise.resolve();
      case 'revoke-invite-cancel': STATE.confirmRevokeInvite=null; render(); return Promise.resolve();
      case 'revoke-invite-confirm': return revokeInviteConfirmed(btn.dataset.email);
      case 'remove-benefit': return removeBenefit(btn.dataset.cat);
      case 'export-report': exportReportExcel(); return Promise.resolve();
      case 'filter-history': STATE.historyFilter=btn.dataset.filter; render(); return Promise.resolve();
      case 'filter-staff': STATE.staffRoleFilter=btn.dataset.filter; render(); return Promise.resolve();
      default: return Promise.resolve();
    }
  }

  function handleSubmit(e){
    var form = e.target;
    if(!form || !form.dataset || !form.dataset.form) return Promise.resolve();
    e.preventDefault();
    var type = form.dataset.form;
    if(type==='login') return doLogin(form);
    if(type==='signup') return doSignup(form);
    if(type==='submit-claim') return submitClaim(form);
    if(type==='invite-staff') return inviteStaff(form);
    if(type==='add-benefit') return addBenefit(form);
    return Promise.resolve();
  }

  function handleChange(e){
    var target = e.target;
    if(target.id==='staff-csv-input'){
      var f = target.files[0]; target.value='';
      return handleStaffCsv(f);
    }
    var action = target.dataset.action;
    if(!action) return Promise.resolve();
    switch(action){
      case 'change-role': return changeRole(target.dataset.id, target.value);
      case 'set-report-month': STATE.reportMonth = parseInt(target.value,10); render(); return Promise.resolve();
      case 'set-report-year': STATE.reportYear = parseInt(target.value,10); render(); return Promise.resolve();
      default: return Promise.resolve();
    }
  }

  function liveCheckAmount(input, available, errorId){
    var el = document.getElementById(errorId);
    if(!el) return;
    var val = parseFloat(input.value);
    if(!isNaN(val) && val > available){
      el.textContent = 'You can only claim up to '+fmtMoney(available)+' based on your available Flex wallet balance.';
      el.style.display = '';
    } else {
      el.textContent = '';
      el.style.display = 'none';
    }
  }

  function handleInput(e){
    var t = e.target;
    if(!STATE.profile) return;
    if(t.id==='claim-amount-input'){
      var wallet = computeWallet(STATE.profile.id);
      liveCheckAmount(t, wallet.available, 'claim-amount-live-error');
    } else if(t.id && t.id.indexOf('edit-amount-')===0){
      var claimId = t.id.slice('edit-amount-'.length);
      var claim = STATE.claims.filter(function(c){ return c.id===claimId; })[0];
      if(claim){
        var w = computeWallet(STATE.profile.id);
        var availableForEdit = claim.status==='pending' ? w.available + Number(claim.amount) : w.available;
        liveCheckAmount(t, availableForEdit, 'edit-amount-live-error-'+claimId);
      }
    }
  }

  /* =========================================================
     BOOTSTRAP
  ========================================================== */
  var app = document.getElementById('app');
  app.addEventListener('click', function(e){ handleClick(e).catch(function(err){ console.error(err); }); });
  app.addEventListener('submit', function(e){ handleSubmit(e).catch(function(err){ console.error(err); }); });
  app.addEventListener('change', function(e){ handleChange(e).catch(function(err){ console.error(err); }); });
  app.addEventListener('input', handleInput);

  init();
})();
