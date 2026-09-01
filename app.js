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
    editingTerminationId: null,
    confirmDeactivateId: null,
    confirmDeleteProfileId: null,
    confirmRevokeInvite: null,
    staffRoleFilter: 'all',
    historyFilter: 'all',
    historySearchQuery: '',
    allSubmissionsSearchQuery: '',
    reportSearchQuery: '',
    reportSortColumn: null,
    reportSortDirection: 'desc',
    rejectedSearchQuery: '',
    rejectedSortColumn: null,
    rejectedSortDirection: 'desc',
    reportMonth: null, reportYear: null,
    invoiceYear: null,
    editingInvoiceRate: false,
    appSettings: {},
    _realtimeSubscribed: false
  };

  /* =========================================================
     UTILITIES
  ========================================================== */
  function fmtMoney(n){ n = isFinite(n)?n:0; var neg = n<0; n=Math.abs(n); var s='$'+n.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}); return neg? '-'+s : s; }
  var CURRENCY_GROUPS = [
    {label: null, items: ['SGD']},
    {label: 'ASEAN', items: ['BND','KHR','IDR','LAK','MYR','MMK','PHP','THB','VND']},
    {label: 'Asia', items: ['CNY','HKD','INR','JPY','KRW','TWD','PKR','BDT','LKR','AED','SAR','ILS']},
    {label: 'Rest of World', items: ['USD','EUR','GBP','AUD','NZD','CAD','CHF','ZAR']}
  ];
  function renderCurrencyOptions(selected){
    selected = selected || 'SGD';
    var html = '';
    CURRENCY_GROUPS.forEach(function(group){
      var optsHtml = group.items.map(function(cur){
        return '<option value="'+cur+'" '+(cur===selected?'selected':'')+'>'+cur+'</option>';
      }).join('');
      html += group.label ? ('<optgroup label="'+group.label+'">'+optsHtml+'</optgroup>') : optsHtml;
    });
    return html;
  }
  function fmtCurrencyAmount(currency, amount){
    var n = Number(amount)||0;
    return (currency||'SGD')+' '+n.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});
  }

  function claimMatchesSearch(c, query, includeEmployee){
    if(!query) return true;
    var q = query.trim().toLowerCase();
    if(!q) return true;
    var haystack = [c.category, c.vendor, c.status, c.currency].filter(Boolean).join(' ').toLowerCase();
    if(includeEmployee){ haystack += ' ' + employeeName(c.employee_id).toLowerCase(); }
    return haystack.indexOf(q) !== -1;
  }

  var EXCHANGE_RATE_CACHE = {};
  var EXCHANGE_RATE_CACHE_MS = 60*60*1000;
  function withTimeout(promise, ms, label){
    return new Promise(function(resolve, reject){
      var settled = false;
      var timer = setTimeout(function(){
        if(settled) return;
        settled = true;
        reject(new Error((label||'Request')+' timed out after '+ms+'ms - the server may be slow or unreachable.'));
      }, ms);
      promise.then(function(v){
        if(settled) return;
        settled = true;
        clearTimeout(timer);
        resolve(v);
      }, function(err){
        if(settled) return;
        settled = true;
        clearTimeout(timer);
        reject(err);
      });
    });
  }

  function fetchRateFrankfurter(currency){
    return fetch('https://api.frankfurter.app/latest?from='+encodeURIComponent(currency)+'&to=SGD')
      .then(function(res){ if(!res.ok) throw new Error('Frankfurter returned '+res.status); return res.json(); })
      .then(function(data){
        var rate = data && data.rates && data.rates.SGD;
        if(!rate || isNaN(rate)) throw new Error('Frankfurter has no SGD rate for '+currency);
        return rate;
      });
  }
  function fetchRateOpenERApi(currency){
    return fetch('https://open.er-api.com/v6/latest/'+encodeURIComponent(currency))
      .then(function(res){ if(!res.ok) throw new Error('open.er-api returned '+res.status); return res.json(); })
      .then(function(data){
        var rate = data && data.rates && data.rates.SGD;
        if(!rate || isNaN(rate)) throw new Error('open.er-api has no SGD rate for '+currency);
        return rate;
      });
  }
  function getExchangeRateToSGD(currency){
    if(!currency || currency==='SGD') return Promise.resolve(1);
    var cached = EXCHANGE_RATE_CACHE[currency];
    if(cached && (Date.now()-cached.at) < EXCHANGE_RATE_CACHE_MS){
      return Promise.resolve(cached.rate);
    }
    return fetchRateFrankfurter(currency).catch(function(err1){
      console.error('Frankfurter rate lookup failed', err1);
      return fetchRateOpenERApi(currency).catch(function(err2){
        console.error('open.er-api rate lookup failed', err2);
        var combined = new Error('Both rate providers failed for '+currency+' - ('+err1.message+') / ('+err2.message+')');
        throw combined;
      });
    }).then(function(rate){
      EXCHANGE_RATE_CACHE[currency] = {rate:rate, at:Date.now()};
      return rate;
    });
  }

  function fmtDate(d){ if(!d) return '-'; var dt=new Date(d+'T00:00:00'); if(isNaN(dt)) return d; return dt.toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'}); }
  function fmtDateTime(iso){ if(!iso) return '-'; var dt=new Date(iso); if(isNaN(dt)) return iso; return dt.toLocaleString(undefined,{year:'numeric',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}); }
  function escapeHtml(str){ return String(str==null?'':str).replace(/[&<>"']/g, function(s){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]; }); }
  function todayStr(){ return new Date().toISOString().slice(0,10); }
  function yearStartStr(){ return new Date().getFullYear()+'-01-01'; }
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

  function claimCutoffNotice(){
    var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var cutoff = new Date(year, month, 25, 23, 59, 59, 999);
    var cutoffLabel = '25 ' + monthNames[month].slice(0,3) + ' ' + year + ', 23:59';
    if(now <= cutoff){
      return 'Submit by ' + cutoffLabel + ' to have this claim processed in ' + monthNames[month] + '. Submissions after this cutoff will be processed the following month.';
    }
    var nextMonthIdx = (month + 1) % 12;
    var nextMonthYear = month === 11 ? year + 1 : year;
    return 'This month\'s cutoff (' + cutoffLabel + ') has passed. Claims submitted now will be processed in ' + monthNames[nextMonthIdx] + ' ' + nextMonthYear + '.';
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
  function sgdAmountOf(c){
    return Number(c.amount_sgd != null ? c.amount_sgd : c.amount) || 0;
  }

  function computeWallet(employeeId){
    var profile = profileById(employeeId) || {annual_allocation:0};
    var currentYear = new Date().getFullYear();
    var empClaims = STATE.claims.filter(function(c){
      return c.employee_id===employeeId && new Date(c.receipt_date+'T00:00:00').getFullYear()===currentYear;
    });
    var approvedTotal=0, pendingTotal=0;
    var byCategory = {};
    STATE.benefits.forEach(function(b){ byCategory[b] = {approved:0, pending:0}; });
    empClaims.forEach(function(c){
      var amt = sgdAmountOf(c);
      if(!byCategory[c.category]) byCategory[c.category] = {approved:0, pending:0};
      if(c.status==='approved'){ approvedTotal+=amt; byCategory[c.category].approved+=amt; }
      if(c.status==='pending'){ pendingTotal+=amt; byCategory[c.category].pending+=amt; }
    });
    var allocation = Number(profile.annual_allocation)||0;
    var available = allocation - approvedTotal - pendingTotal;
    var utilizationPct = allocation>0 ? Math.min(100, (approvedTotal/allocation)*100) : 0;
    return {allocation:allocation, approvedTotal:approvedTotal, pendingTotal:pendingTotal, available:available, utilizationPct:utilizationPct, byCategory:byCategory, year:currentYear};
  }

  function buildPeriodReport(claims, startDate, endDate){
    var inRange = function(c){
      var d = new Date(c.receipt_date+'T00:00:00');
      return d>=startDate && d<=endDate;
    };
    var approved = claims.filter(function(c){ return c.status==='approved' && inRange(c); });
    var rejected = claims.filter(function(c){ return c.status==='rejected' && inRange(c); });

    var byCategory={}, byEmployee={}, totalClaimed=0;
    approved.forEach(function(c){
      var amt = sgdAmountOf(c);
      totalClaimed+=amt;
      byCategory[c.category] = byCategory[c.category]||{count:0,total:0};
      byCategory[c.category].count++; byCategory[c.category].total+=amt;
      byEmployee[c.employee_id] = byEmployee[c.employee_id]||{count:0,total:0,name:employeeName(c.employee_id),categories:{}};
      byEmployee[c.employee_id].count++; byEmployee[c.employee_id].total+=amt;
      byEmployee[c.employee_id].categories[c.category] = byEmployee[c.employee_id].categories[c.category]||{count:0,total:0};
      byEmployee[c.employee_id].categories[c.category].count++;
      byEmployee[c.employee_id].categories[c.category].total+=amt;
    });

    var totalRejected = 0;
    var byEmployeeRejected = {};
    var rejectedClaims = rejected.map(function(c){
      var amt = sgdAmountOf(c);
      totalRejected += amt;
      var reasonText = c.reject_reason || '';
      if(c.admin_note){ reasonText += (reasonText ? ' - ' : '') + c.admin_note; }
      reasonText = reasonText || 'No reason given';
      byEmployeeRejected[c.employee_id] = byEmployeeRejected[c.employee_id]||{name:employeeName(c.employee_id),count:0,total:0,reasons:{}};
      byEmployeeRejected[c.employee_id].count++;
      byEmployeeRejected[c.employee_id].total+=amt;
      byEmployeeRejected[c.employee_id].reasons[reasonText] = (byEmployeeRejected[c.employee_id].reasons[reasonText]||0)+1;
      return {
        employeeId: c.employee_id,
        employeeName: employeeName(c.employee_id),
        category: c.category,
        amount: amt,
        reason: reasonText
      };
    });

    return {byCategory:byCategory, byEmployee:byEmployee, totalClaimed:totalClaimed, totalCount:approved.length,
      rejectedClaims:rejectedClaims, byEmployeeRejected:byEmployeeRejected, totalRejectedCount:rejected.length, totalRejectedAmount:totalRejected};
  }

  /* =========================================================
     ANNUAL INVOICE (Headcount Adjustment + Unutilised Credit Note)
     Principle: adjustment = (headcount at 31 Dec - headcount at 1 Jan) / 2,
     charged (or credited if negative) at the configured rate per head per year.
     Any amount not utilised by employees for the year is credited back via
     credit note, as is any negative headcount adjustment. Net amount =
     additional headcount charge minus total credit note.
  ========================================================== */
  function getInvoiceRate(){
    var n = parseFloat(STATE.appSettings && STATE.appSettings.invoice_rate_per_head);
    return isNaN(n) ? 88 : n;
  }

  function buildInvoiceYearOptions(){
    var now = new Date();
    var years = {};
    years[now.getFullYear()] = true;
    years[now.getFullYear()-1] = true;
    STATE.profiles.forEach(function(p){ if(p.date_of_joining){ years[parseInt(p.date_of_joining.slice(0,4),10)]=true; } });
    STATE.claims.forEach(function(c){ if(c.receipt_date){ years[parseInt(c.receipt_date.slice(0,4),10)]=true; } });
    return Object.keys(years).map(Number).sort(function(a,b){ return b-a; });
  }

  function computeAnnualInvoice(year){
    var startStr = year+'-01-01';
    var endStr = year+'-12-31';
    var rate = getInvoiceRate();

    // An employee with no Date of Employment recorded is treated as already
    // employed (rather than excluded) - missing data shouldn't silently drop
    // them from headcount or entitlement totals. Only an explicit
    // Date of Termination excludes them from a given date/period.
    var employedAt = function(p, dateStr){
      return p.role==='user' &&
        (!p.date_of_joining || p.date_of_joining<=dateStr) &&
        (!p.date_of_termination || p.date_of_termination>=dateStr);
    };
    var employedDuringRange = function(p, rangeStartStr, rangeEndStr){
      return p.role==='user' &&
        (!p.date_of_joining || p.date_of_joining<=rangeEndStr) &&
        (!p.date_of_termination || p.date_of_termination>=rangeStartStr);
    };

    var headcountAt = function(dateStr){
      return STATE.profiles.filter(function(p){ return employedAt(p, dateStr); }).length;
    };
    var startHeadcount = headcountAt(startStr);
    var endHeadcount = headcountAt(endStr);
    var headcountDelta = endHeadcount - startHeadcount;
    var adjustmentUnits = headcountDelta/2;
    var adjustmentAmount = adjustmentUnits * rate;
    var additionalCharge = Math.max(adjustmentAmount, 0);
    var headcountCredit = Math.max(-adjustmentAmount, 0);

    var employeesInYear = STATE.profiles.filter(function(p){ return employedDuringRange(p, startStr, endStr); });
    var totalEntitlementPool=0, totalApprovedForYear=0;
    var unutilizedByEmployee = employeesInYear.map(function(p){
      var approved = STATE.claims.filter(function(c){
        return c.employee_id===p.id && c.status==='approved' &&
          c.receipt_date && c.receipt_date>=startStr && c.receipt_date<=endStr;
      }).reduce(function(s,c){ return s+sgdAmountOf(c); }, 0);
      var allocation = Number(p.annual_allocation)||0;
      var unutilized = Math.max(0, allocation-approved);
      totalEntitlementPool += allocation;
      totalApprovedForYear += approved;
      return {name:p.name, allocation:allocation, approved:approved, unutilized:unutilized};
    }).sort(function(a,b){ return b.unutilized-a.unutilized; });
    var totalUnutilized = unutilizedByEmployee.reduce(function(s,e){ return s+e.unutilized; }, 0);

    var creditNoteAmount = totalUnutilized + headcountCredit;
    var netAmount = additionalCharge - creditNoteAmount;
    // Invoice Payable Amount: what the company is actually billed for the
    // upcoming year's benefit funding, net of the headcount adjustment and
    // any credit note carried in from this year.
    var invoicePayableAmount = totalEntitlementPool + adjustmentAmount - creditNoteAmount;

    // Supporting lists so the headcount adjustment can be audited: who counted
    // as headcount at the start of the year, and who joined or was terminated
    // during the year (the movements that produced the net change).
    var startHeadcountList = STATE.profiles.filter(function(p){ return employedAt(p, startStr); })
      .map(function(p){ return {name:p.name, allocation:Number(p.annual_allocation)||0}; })
      .sort(function(a,b){ return a.name.localeCompare(b.name); });

    var joinedDuringYear = STATE.profiles.filter(function(p){
      return p.role==='user' && p.date_of_joining && p.date_of_joining>startStr && p.date_of_joining<=endStr;
    });
    var terminatedDuringYear = STATE.profiles.filter(function(p){
      return p.role==='user' && p.date_of_termination && p.date_of_termination>=startStr && p.date_of_termination<=endStr;
    });
    var membershipChanges = joinedDuringYear.map(function(p){
      return {name:p.name, allocation:Number(p.annual_allocation)||0, change:'Joined', date:p.date_of_joining};
    }).concat(terminatedDuringYear.map(function(p){
      return {name:p.name, allocation:Number(p.annual_allocation)||0, change:'Terminated', date:p.date_of_termination};
    })).sort(function(a,b){ return a.name.localeCompare(b.name); });

    return {
      year:year, rate:rate, startHeadcount:startHeadcount, endHeadcount:endHeadcount,
      headcountDelta:headcountDelta, adjustmentUnits:adjustmentUnits, adjustmentAmount:adjustmentAmount,
      additionalCharge:additionalCharge, headcountCredit:headcountCredit,
      totalEntitlementPool:totalEntitlementPool, totalApprovedForYear:totalApprovedForYear,
      totalUnutilized:totalUnutilized, unutilizedByEmployee:unutilizedByEmployee,
      creditNoteAmount:creditNoteAmount, netAmount:netAmount, invoicePayableAmount:invoicePayableAmount,
      startHeadcountList:startHeadcountList, membershipChanges:membershipChanges
    };
  }

  function uniqueYearsFromClaims(claims, currentYear){
    var years = {}; years[currentYear]=true;
    claims.forEach(function(c){ if(c.receipt_date){ years[new Date(c.receipt_date+'T00:00:00').getFullYear()]=true; } });
    return Object.keys(years).map(Number).sort(function(a,b){ return b-a; });
  }

  var REPORT_MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  function buildReportYearOptions(claims){
    var now = new Date();
    var currentYear = now.getFullYear();
    var options = [{value:String(currentYear), label:String(currentYear)},
      {value:'ytd', label:'Year to Date '+currentYear+' ('+REPORT_MONTH_NAMES[0].slice(0,3)+'-'+REPORT_MONTH_NAMES[now.getMonth()].slice(0,3)+')'}];
    uniqueYearsFromClaims(claims, currentYear).filter(function(yr){ return yr!==currentYear; }).forEach(function(yr){
      options.push({value:String(yr), label:String(yr)});
    });
    return options;
  }

  function resolveReportPeriod(yearValue, monthValue){
    var now = new Date();
    if(yearValue==='ytd'){
      return {
        startDate: new Date(now.getFullYear(),0,1,0,0,0),
        endDate: now,
        label: 'Year to Date '+now.getFullYear()+' ('+REPORT_MONTH_NAMES[0].slice(0,3)+'-'+REPORT_MONTH_NAMES[now.getMonth()].slice(0,3)+')',
        fileSuffix: now.getFullYear()+'-YTD'
      };
    }
    var yr = parseInt(yearValue,10); if(isNaN(yr)) yr = now.getFullYear();
    var mo = parseInt(monthValue,10); if(isNaN(mo)) mo = now.getMonth();
    return {
      startDate: new Date(yr,mo,1,0,0,0),
      endDate: new Date(yr,mo+1,0,23,59,59),
      label: REPORT_MONTH_NAMES[mo]+' '+yr,
      fileSuffix: yr+'-'+String(mo+1).padStart(2,'0')
    };
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
      calls.push(supabase.from('app_settings').select('*'));
    }
    return Promise.all(calls).then(function(results){
      STATE.benefits = (results[0].data||[]).map(function(b){ return b.name; });
      STATE.rejectReasons = (results[1].data||[]).map(function(r){ return r.reason; });
      STATE.claims = results[2].data || [];
      STATE.notifications = results[3].data || [];
      if(isAdmin){
        STATE.profiles = results[4].data || [];
        STATE.invites = results[5].data || [];
        STATE.appSettings = {};
        (results[6].data||[]).forEach(function(s){ STATE.appSettings[s.key] = s.value; });
      } else {
        STATE.profiles = STATE.profile ? [STATE.profile] : [];
        STATE.invites = [];
      }
    });
  }

  function subscribeRealtime(){
    if(STATE._realtimeSubscribed || !supabase) return;
    STATE._realtimeSubscribed = true;
    ['claims','benefits','notifications','profiles','app_settings'].forEach(function(table){
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
      if(event === 'PASSWORD_RECOVERY'){
        STATE.session = session; STATE.authView = 'reset-password'; STATE.authError=''; STATE.authInfo='';
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
    if(STATE.authView === 'reset-password'){
      app.innerHTML = renderResetPassword() + renderBrandFooter();
    } else if(!STATE.session || !STATE.profile){
      app.innerHTML = renderAuthScreen() + renderBrandFooter();
    } else {
      app.innerHTML = (STATE.profile.role==='admin' ? renderAdminShell() : renderUserShell()) + renderBrandFooter();
    }
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
    if(m.message){
      return '<div class="modal-overlay" onclick="if(event.target===event.currentTarget){window.closeReceiptModal();}">'+
        '<div class="modal-box">'+
          '<div class="modal-header"><span>'+escapeHtml(m.title)+'</span><button class="link-btn" data-action="close-modal">Close</button></div>'+
          '<div class="modal-body">'+
            '<p style="margin:0 0 16px;">'+escapeHtml(m.message)+'</p>'+
            '<button class="btn btn-primary" data-action="close-modal">OK</button>'+
          '</div>'+
        '</div>'+
      '</div>';
    }
    return '<div class="modal-overlay" onclick="if(event.target===event.currentTarget){window.closeReceiptModal();}">'+
      '<div class="modal-box">'+
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
        '<button data-action="show-signup">New User Login</button>'+
        '<button data-action="forgot-password">Forgot password?</button>'+
      '</div>'+
    '</div></div>';
  }

  function renderResetPassword(){
    return '<div class="login-wrap"><div class="login-card">'+
      '<div class="login-brand"><div class="login-logo">FB</div><h1>Set New Password</h1><p class="muted">Choose a new password for your account</p></div>'+
      '<form data-form="reset-password" class="login-form">'+
        '<label>New Password<input type="password" name="password" autocomplete="new-password" required placeholder="********" /></label>'+
        '<label>Confirm Password<input type="password" name="confirmPassword" autocomplete="new-password" required placeholder="********" /></label>'+
        (STATE.authError ? '<div class="field-error">'+escapeHtml(STATE.authError)+'</div>' : '')+
        '<button type="submit" class="btn btn-primary btn-block">Set new password</button>'+
      '</form>'+
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
      '<div class="brand-mini"><img src="'+CRESCO_LOGO_DATA_URI+'" class="topbar-logo" alt="Cresco" /> Cresco Insurance Agency Flex Benefits Portal</div>'+
      '<div class="topbar-right"><span class="user-chip">'+escapeHtml(STATE.profile.name)+' <span class="role-tag">'+STATE.profile.role+'</span></span>'+
      '<button class="btn btn-ghost btn-sm" data-action="logout">Log out</button></div>'+
    '</div>';
  }
  function navTab(tab, label){
    return '<button class="tab '+(STATE.activeTab===tab?'active':'')+'" data-action="nav" data-tab="'+tab+'">'+label+'</button>';
  }
  function cardTitleWithClose(title){
    return '<div class="card-title card-title-row"><span>'+title+'</span>'+
      '<button class="tab-close-btn" data-action="nav" data-tab="dashboard" title="Close">X</button></div>';
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
        '<button class="tab tab-cta" data-action="buy-travel-insurance">Buy Travel Insurance Now</button>'+
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
      '<div class="card stat"><div class="stat-label">'+wallet.year+' Annual Allocation</div><div class="stat-value">'+fmtMoney(wallet.allocation)+'</div></div>'+
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
    return '<div class="card">'+cardTitleWithClose('Submit a New Claim')+
      '<div class="info-banner banner-warning">'+escapeHtml(claimCutoffNotice())+'</div>'+
      '<form data-form="submit-claim" class="claim-form">'+
        '<label>Benefit Category<select name="category" required><option value="">Select a category...</option>'+
          STATE.benefits.map(function(b){ return '<option value="'+escapeHtml(b)+'">'+escapeHtml(b)+'</option>'; }).join('')+
        '</select></label>'+
        '<label>Vendor / Merchant<input type="text" name="vendor" list="vendor-options-new" required placeholder="e.g. California Fitness" autocomplete="off" /></label>'+
        renderVendorDatalist('vendor-options-new')+
        '<div class="amount-row">'+
          '<label style="flex:0 0 100px;">Currency<select id="claim-currency-input" name="currency">'+renderCurrencyOptions('SGD')+'</select></label>'+
          '<label style="flex:1;">Amount to Claim<input type="number" id="claim-amount-input" name="amount" step="0.01" min="0.01" required placeholder="e.g. 120.00" /></label>'+
        '</div>'+
        '<div id="claim-amount-preview" class="tiny muted"></div>'+
        '<div class="muted small">Available balance: '+fmtMoney(wallet.available)+' (SGD)</div>'+
        '<div id="claim-amount-live-error" class="field-error" style="display:none;"></div>'+
        '<label>Date of Receipt<input type="date" name="receiptDate" required min="'+yearStartStr()+'" max="'+todayStr()+'" /></label>'+
        '<div class="field-hint">Only receipts from '+new Date().getFullYear()+' can be claimed - your benefits reset every 1 January.</div>'+
        '<label>Upload Receipt (photo or PDF, max 4MB)</label>'+
        '<div class="dropzone" id="claim-receipt-dropzone">'+
          '<input type="file" name="receipt" accept="image/*,.pdf" required />'+
          '<div class="dropzone-hint">Choose a file, or drag and drop it here</div>'+
        '</div>'+
        (STATE.claimFormError ? '<div class="field-error">'+escapeHtml(STATE.claimFormError)+'</div>' : '')+
        '<div class="field-hint">Only Gym membership, Health screening, Optical, Dental and Leisure travel are claimable. Other expenses, including petrol, cannot be reimbursed through this wallet.</div>'+
        '<button type="submit" class="btn btn-primary">Submit Claim</button>'+
      '</form></div>';
  }

  function renderUserHistory(){
    var claims = STATE.claims.slice();
    var filter = STATE.historyFilter||'all';
    if(filter!=='all') claims = claims.filter(function(c){ return c.status===filter; });
    var searchQuery = STATE.historySearchQuery||'';
    claims = claims.filter(function(c){ return claimMatchesSearch(c, searchQuery, false); });
    claims.sort(function(a,b){ return b.submitted_at.localeCompare(a.submitted_at); });
    var filters = ['all','pending','approved','rejected'];
    return '<div class="card">'+cardTitleWithClose('Transaction History')+
      '<div class="muted small" style="margin-bottom:12px;">Pending and rejected claims can be edited or deleted. Approved claims are locked.</div>'+
      '<input type="text" id="history-search-input" class="search-input" placeholder="Search by category, vendor, currency or status..." value="'+escapeHtml(searchQuery)+'" style="margin-bottom:12px;" />'+
      '<div class="filter-row">'+filters.map(function(f){ return '<button class="chip-filter '+(filter===f?'active':'')+'" data-action="filter-history" data-filter="'+f+'">'+(f.charAt(0).toUpperCase()+f.slice(1))+'</button>'; }).join('')+'</div>'+
      renderClaimsTable(claims,false,false,true)+
    '</div>';
  }

  function renderUserNotifications(){
    var notifs = STATE.notifications.slice().sort(function(a,b){ return b.created_at.localeCompare(a.created_at); });
    if(!notifs.length) return '<div class="card">'+cardTitleWithClose('Notifications')+'<div class="empty-state">No notifications yet.</div></div>';
    return '<div class="card">'+cardTitleWithClose('Notifications')+'<div class="notif-list">'+
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
    var colCount = 8 + (showEmployee?1:0) + (adminActions?1:0) + (userActions?1:0);
    var rows = claims.map(function(c){
      var row = '<tr>'+
        (showEmployee ? '<td>'+escapeHtml(employeeName(c.employee_id))+'</td>' : '')+
        '<td>'+escapeHtml(c.category)+'</td>'+
        '<td>'+escapeHtml(c.vendor||'-')+'</td>'+
        '<td>'+fmtCurrencyAmount(c.currency, c.amount)+((c.currency && c.currency!=='SGD') ? '<div class="tiny muted">\u2248 '+fmtMoney(sgdAmountOf(c))+' SGD</div>' : '')+'</td>'+
        '<td>'+fmtDate(c.receipt_date)+'</td>'+
        '<td>'+fmtDate((c.submitted_at||'').slice(0,10))+'</td>'+
        '<td>'+(c.status==='approved' ? fmtDate((c.decided_at||'').slice(0,10)) : '-')+'</td>'+
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
      '<th>Category</th><th>Vendor</th><th>Amount</th><th>Receipt Date</th><th>Submission Date</th><th>Approved</th><th>Status</th><th>Receipt</th>'+
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
      '<label>Rejection Reason<select data-field="reject-reason-'+c.id+'" data-action="reject-reason-select" data-id="'+c.id+'"><option value="">Select a reason...</option>'+
        STATE.rejectReasons.filter(function(r){ return r!=='Others'; }).map(function(r){ return '<option value="'+escapeHtml(r)+'">'+escapeHtml(r)+'</option>'; }).join('')+
        '<option value="Others">Others (please specify)</option>'+
      '</select></label>'+
      '<label id="reject-other-wrap-'+c.id+'" style="display:none;">Please Specify<input type="text" data-field="reject-other-'+c.id+'" placeholder="Type the reason..." /></label>'+
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
      '<label>Currency<select id="edit-currency-'+c.id+'">'+renderCurrencyOptions(c.currency)+'</select></label>'+
      '<label>Amount<input type="number" id="edit-amount-'+c.id+'" step="0.01" min="0.01" value="'+c.amount+'"/></label>'+
      '<div id="edit-amount-preview-'+c.id+'" class="tiny muted"></div>'+
      '<div id="edit-amount-live-error-'+c.id+'" class="field-error" style="display:none;"></div>'+
      '<label>Receipt Date<input type="date" id="edit-date-'+c.id+'" value="'+c.receipt_date+'" min="'+yearStartStr()+'" max="'+todayStr()+'"/></label>'+
      '<div class="field-hint">Only receipts from '+new Date().getFullYear()+' can be claimed - your benefits reset every 1 January.</div>'+
      '<label>Replace Receipt (optional)</label>'+
      '<div class="dropzone" id="edit-receipt-dropzone-'+c.id+'">'+
        '<input type="file" id="edit-receipt-'+c.id+'" accept="image/*,.pdf"/>'+
        '<div class="dropzone-hint">Choose a file, or drag and drop it here</div>'+
      '</div>'+
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
        navTab('staff','Employee Management')+
        navTab('benefits','Benefit Categories')+
        navTab('access','User Access')+
        navTab('finance','Finance')+
        navTab('reports','Reports')+
      '</div>'+
      '<div class="content">'+
        (tab==='all' ? renderAdminAllSubmissions() :
         tab==='staff' ? renderAdminStaff() :
         tab==='benefits' ? renderAdminBenefits() :
         tab==='access' ? renderAdminAccess() :
         tab==='finance' ? renderAdminFinance() :
         tab==='reports' ? renderAdminReports() :
         renderAdminApprovals())+
      '</div></div>';
  }

  function renderAdminApprovals(){
    var pending = STATE.claims.filter(function(c){ return c.status==='pending'; }).sort(function(a,b){ return a.submitted_at.localeCompare(b.submitted_at); });
    return '<div class="card"><div class="card-title">Pending Approvals'+(pending.length?' <span class="badge">'+pending.length+'</span>':'')+'</div>'+renderClaimsTable(pending,true,true,false)+'</div>';
  }

  function renderAdminAllSubmissions(){
    var searchQuery = STATE.allSubmissionsSearchQuery||'';
    var claims = STATE.claims.filter(function(c){ return claimMatchesSearch(c, searchQuery, true); }).slice().sort(function(a,b){ return b.submitted_at.localeCompare(a.submitted_at); });
    return '<div class="card"><div class="card-title">All Submissions</div>'+
      '<input type="text" id="all-submissions-search-input" class="search-input" placeholder="Search by employee, category, vendor, currency or status..." value="'+escapeHtml(searchQuery)+'" style="margin-bottom:12px;" />'+
      renderClaimsTable(claims,true,false,false)+'</div>';
  }

  function renderAdminStaff(){
    var roleFilter = STATE.staffRoleFilter || 'all';
    var visibleProfiles = STATE.profiles.filter(function(p){ return roleFilter==='all' || p.role===roleFilter; });
    var staffRows = visibleProfiles.map(function(p){
      var allocCell = STATE.editingAllocId===p.id
        ? '<input type="number" min="0" step="1" style="width:90px" id="alloc-input-'+p.id+'" value="'+p.annual_allocation+'"/> <button class="btn btn-sm btn-primary" data-action="save-alloc" data-id="'+p.id+'">Save</button>'
        : fmtMoney(p.annual_allocation)+' <button class="link-btn" data-action="edit-alloc" data-id="'+p.id+'">Edit</button>';
      var terminationCell = STATE.editingTerminationId===p.id
        ? '<input type="date" style="width:150px" id="termination-input-'+p.id+'" value="'+(p.date_of_termination||'')+'"/> <button class="btn btn-sm btn-primary" data-action="save-termination" data-id="'+p.id+'">Save</button>'
        : (p.date_of_termination ? fmtDate(p.date_of_termination) : '-')+' <button class="link-btn" data-action="edit-termination" data-id="'+p.id+'">Edit</button>';
      var actionsCell;
      if(STATE.confirmDeactivateId===p.id){
        actionsCell = '<button class="btn btn-sm btn-danger" data-action="toggle-active-confirm" data-id="'+p.id+'">Confirm?</button> <button class="btn btn-sm btn-ghost" data-action="toggle-active-cancel" data-id="'+p.id+'">Cancel</button>';
      } else if(STATE.confirmDeleteProfileId===p.id){
        actionsCell = '<button class="btn btn-sm btn-danger" data-action="delete-profile-confirm" data-id="'+p.id+'">Confirm Delete?</button> <button class="btn btn-sm btn-ghost" data-action="delete-profile-cancel" data-id="'+p.id+'">Cancel</button>';
      } else {
        actionsCell = '<button class="btn btn-sm btn-ghost" data-action="toggle-active" data-id="'+p.id+'">'+(p.active?'Deactivate':'Activate')+'</button> '+
          '<button class="btn btn-sm btn-danger" data-action="delete-profile" data-id="'+p.id+'">Delete</button>';
      }
      var roleLabel = p.role==='admin' ? 'Admin' : 'User';
      return '<tr><td>'+escapeHtml(p.name)+'</td><td>'+escapeHtml(p.email)+'</td>'+
        '<td><span class="role-chip">'+roleLabel+'</span></td>'+
        '<td>'+allocCell+'</td>'+
        '<td>'+fmtDate(p.date_of_joining)+'</td>'+
        '<td>'+(p.effective_date ? fmtDate(p.effective_date) : '-')+'</td>'+
        '<td>'+terminationCell+'</td>'+
        '<td><span class="status-pill '+(p.active?'status-approved':'status-rejected')+'">'+(p.active?'Active':'Inactive')+'</span></td>'+
        '<td class="actions-cell">'+actionsCell+'</td></tr>';
    }).join('');
    var staffFilters = [{key:'all',label:'All'},{key:'user',label:'User'},{key:'admin',label:'Admin'}];

    var pendingInvites = STATE.invites.filter(function(i){ return !i.used; });
    var inviteRows = pendingInvites.map(function(i){
      var welcomeCell;
      if(i.welcome_email_sent_at){
        welcomeCell = fmtDateTime(i.welcome_email_sent_at);
      } else if(i.effective_date){
        welcomeCell = '<span class="tiny muted">Scheduled for '+fmtDate(i.effective_date)+'</span>';
      } else {
        welcomeCell = '-';
      }
      return '<tr><td>'+escapeHtml(i.name)+'</td><td>'+escapeHtml(i.email)+'</td><td>'+fmtMoney(i.annual_allocation)+'</td>'+
        '<td>'+welcomeCell+'</td>'+
        '<td>'+(i.effective_date ? fmtDate(i.effective_date) : '-')+'</td>'+
        '<td>'+(STATE.confirmRevokeInvite===i.email
          ? '<button class="btn btn-sm btn-danger" data-action="revoke-invite-confirm" data-email="'+escapeHtml(i.email)+'">Confirm?</button> <button class="btn btn-sm btn-ghost" data-action="revoke-invite-cancel">Cancel</button>'
          : '<button class="btn btn-sm btn-ghost" data-action="revoke-invite" data-email="'+escapeHtml(i.email)+'">Revoke</button>')+
        '</td></tr>';
    }).join('');

    return ''+
    '<div class="card"><div class="card-title">Add Employee</div>'+
      '<form data-form="invite-staff" class="inline-form">'+
        '<label class="mini-field">Full Name<input type="text" name="name" placeholder="e.g. Jane Lim" required /></label>'+
        '<label class="mini-field">Work Email<input type="email" name="email" placeholder="jane@company.com" required /></label>'+
        '<label class="mini-field">Date of Employment<input type="date" name="dateOfEmployment" style="width:160px" required /></label>'+
        '<label class="mini-field">Effective Date<input type="date" name="effectiveDate" style="width:160px" required /></label>'+
        '<label class="mini-field">PayNow Mobile Number<input type="tel" name="paynowMobile" placeholder="e.g. 91234567" style="width:160px" required /></label>'+
        '<label class="mini-field">Entitlement (SGD)<input type="number" name="annualAllocation" value="1000" min="0" step="1" style="width:140px" required /></label>'+
        '<button type="submit" class="btn btn-primary">Add Employee</button>'+
      '</form>'+
      '<div class="field-hint">New employees are invited as Users. To grant Admin access, use the User Access tab after they\'ve signed up. A welcome email with sign-up instructions is sent automatically once the Effective Date arrives.</div>'+
    '</div>'+
    '<div class="card"><div class="card-title">Bulk Invite (CSV)</div>'+
      '<div class="muted small" style="margin-bottom:10px;">Columns: name,email,annualAllocation,dateOfEmployment,paynowMobile,effectiveDate. First row is treated as a header and skipped. The last three columns are optional.</div>'+
      '<div class="dropzone" id="staff-csv-dropzone">'+
        '<input type="file" id="staff-csv-input" accept=".csv" />'+
        '<div class="dropzone-hint">Choose a file, or drag and drop it here</div>'+
      '</div>'+
    '</div>'+
    (pendingInvites.length ? '<div class="card"><div class="card-title">Pending Employee New User Sign Up</div><div class="table-wrap"><table class="data-table">'+
      '<thead><tr><th>Name</th><th>Email</th><th>Allocation</th><th>Welcome Email Sent</th><th>Effective Date</th><th>Actions</th></tr></thead>'+
      '<tbody>'+inviteRows+'</tbody></table></div></div>' : '')+
    '<div class="card"><div class="card-title">Employee Directory</div>'+
      '<div class="filter-row">'+staffFilters.map(function(f){ return '<button class="chip-filter '+(roleFilter===f.key?'active':'')+'" data-action="filter-staff" data-filter="'+f.key+'">'+f.label+'</button>'; }).join('')+'</div>'+
      '<div class="table-wrap"><table class="data-table">'+
      '<thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Annual Allocation</th><th>Date of Employment</th><th>Effective Date</th><th>Date of Termination</th><th>Status</th><th>Actions</th></tr></thead>'+
      '<tbody>'+staffRows+'</tbody></table></div>'+
      '<div class="field-hint">Deleting an employee removes their account, all their claim history, and their notifications - permanently, and this cannot be undone. Their login itself still technically exists in Supabase until removed from the dashboard\'s Authentication &gt; Users page too, but they won\'t be able to do anything with it here once deleted.</div>'+
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
        '<td>'+fmtDate((p.created_at||'').slice(0,10))+'</td>'+
        '<td>'+(!p.active && p.deactivated_at ? fmtDate((p.deactivated_at||'').slice(0,10)) : '-')+'</td>'+
        '<td><button class="btn btn-sm btn-ghost" data-action="toggle-active" data-id="'+p.id+'">'+(p.active?'Deactivate':'Activate')+'</button></td>'+
      '</tr>';
    }).join('');
    return '<div class="card"><div class="card-title">User Access Rights</div><div class="table-wrap"><table class="data-table">'+
      '<thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Date Added</th><th>Date of Deactivation</th><th>Status</th></tr></thead>'+
      '<tbody>'+rows+'</tbody></table></div>'+
      '<div class="field-hint">Password resets are self-service - employees use "Forgot password?" on the login screen.</div></div>';
  }

  function sortArrow(col, activeCol, dir){
    if(col!==activeCol) return '';
    return dir==='asc' ? ' &uarr;' : ' &darr;';
  }
  function sortRows(rows, column, direction, getters){
    if(!column || !getters[column]) return rows;
    var getter = getters[column];
    var sorted = rows.slice().sort(function(a,b){ return getter(a)-getter(b); });
    if(direction==='desc') sorted.reverse();
    return sorted;
  }

  function renderAdminFinance(){
    var now = new Date();
    var year = (STATE.invoiceYear!=null) ? STATE.invoiceYear : (now.getFullYear()-1);
    var yearOptions = buildInvoiceYearOptions();
    var inv = computeAnnualInvoice(year);
    var invoiceDate = '2 Jan '+(year+1);

    var rateCell = STATE.editingInvoiceRate
      ? '<input type="number" min="0" step="0.01" style="width:100px" id="invoice-rate-input" value="'+inv.rate+'"/> <button class="btn btn-sm btn-primary" data-action="save-invoice-rate">Save</button>'
      : '<span class="muted">Rate: '+fmtMoney(inv.rate)+' / head / year</span> <button class="link-btn" data-action="edit-invoice-rate">Edit</button>';

    var empRows = inv.unutilizedByEmployee.map(function(e){
      return '<tr><td>'+escapeHtml(e.name)+'</td><td>'+fmtMoney(e.allocation)+'</td><td>'+fmtMoney(e.approved)+'</td><td>'+fmtMoney(e.unutilized)+'</td></tr>';
    }).join('');

    return ''+
    '<div class="card">'+
      '<div class="card-title-row">'+
        '<div class="card-title">Annual Invoice</div>'+
        '<div class="report-controls" style="margin-bottom:0;">'+
          '<select data-action="set-invoice-year">'+yearOptions.map(function(y){ return '<option value="'+y+'" '+(y===year?'selected':'')+'>'+y+'</option>'; }).join('')+'</select>'+
          '<button class="btn btn-ghost btn-sm" data-action="export-invoice-pdf">Export to PDF</button>'+
        '</div>'+
      '</div>'+
      '<div class="report-summary" style="margin-bottom:16px;">Period: 1 Jan '+year+' - 31 Dec '+year+' &middot; Invoice date '+invoiceDate+' &middot; '+rateCell+'</div>'+
      '<div class="grid-cards">'+
        '<div class="card stat"><div class="stat-label">Headcount Adjustment</div><div class="stat-value">'+fmtMoney(inv.adjustmentAmount)+'</div></div>'+
        '<div class="card stat"><div class="stat-label">Unutilised Benefit</div><div class="stat-value">'+fmtMoney(inv.totalUnutilized)+'</div></div>'+
        '<div class="card stat"><div class="stat-label">Total Credit Note</div><div class="stat-value">'+fmtMoney(inv.creditNoteAmount)+'</div></div>'+
        '<div class="card stat"><div class="stat-label">'+(inv.netAmount>=0?'Net Amount Due':'Net Credit Balance')+'</div><div class="stat-value">'+fmtMoney(Math.abs(inv.netAmount))+'</div></div>'+
        '<div class="card stat highlight"><div class="stat-label">Invoice Payable Amount</div><div class="stat-value">'+fmtMoney(inv.invoicePayableAmount)+'</div></div>'+
      '</div>'+
    '</div>'+
    '<div class="card">'+
      '<div class="card-title">Calculation Detail</div>'+
      '<details><summary class="link-btn" style="cursor:pointer;">Headcount Adjustment</summary>'+
        '<div class="table-wrap" style="margin-top:10px;"><table class="data-table"><tbody>'+
          '<tr><td>Headcount as at 1 Jan '+year+'</td><td>'+inv.startHeadcount+'</td></tr>'+
          '<tr><td>Headcount as at 31 Dec '+year+'</td><td>'+inv.endHeadcount+'</td></tr>'+
          '<tr><td>Net Change</td><td>'+inv.headcountDelta+'</td></tr>'+
          '<tr><td>Adjustment Units (Net Change &divide; 2)</td><td>'+inv.adjustmentUnits+'</td></tr>'+
          '<tr><td>Rate per Headcount</td><td>'+fmtMoney(inv.rate)+'</td></tr>'+
        '</tbody></table></div>'+
      '</details>'+
      '<details style="margin-top:12px;"><summary class="link-btn" style="cursor:pointer;">Headcount as at 1 Jan '+year+' ('+inv.startHeadcountList.length+' employees)</summary>'+
        '<div class="table-wrap" style="margin-top:10px;"><table class="data-table">'+
        '<thead><tr><th>Employee</th><th>Annual Allocation</th></tr></thead>'+
        '<tbody>'+(inv.startHeadcountList.length ? inv.startHeadcountList.map(function(e){ return '<tr><td>'+escapeHtml(e.name)+'</td><td>'+fmtMoney(e.allocation)+'</td></tr>'; }).join('') : '<tr><td colspan="2" class="muted">No employees on record as at 1 Jan '+year+'.</td></tr>')+'</tbody></table></div>'+
      '</details>'+
      '<details style="margin-top:12px;"><summary class="link-btn" style="cursor:pointer;">Membership Changes in '+year+' ('+inv.membershipChanges.length+' employees)</summary>'+
        '<div class="table-wrap" style="margin-top:10px;"><table class="data-table">'+
        '<thead><tr><th>Employee</th><th>Change</th><th>Date</th><th>Annual Allocation</th></tr></thead>'+
        '<tbody>'+(inv.membershipChanges.length ? inv.membershipChanges.map(function(e){ return '<tr><td>'+escapeHtml(e.name)+'</td><td>'+e.change+'</td><td>'+fmtDate(e.date)+'</td><td>'+fmtMoney(e.allocation)+'</td></tr>'; }).join('') : '<tr><td colspan="4" class="muted">No joiners or terminations recorded in '+year+'.</td></tr>')+'</tbody></table></div>'+
      '</details>'+
      '<details style="margin-top:12px;"><summary class="link-btn" style="cursor:pointer;">Unutilised Benefit</summary>'+
        '<div class="table-wrap" style="margin-top:10px;"><table class="data-table"><tbody>'+
          '<tr><td>Total Entitlement Pool for '+year+'</td><td>'+fmtMoney(inv.totalEntitlementPool)+'</td></tr>'+
          '<tr><td>Total Approved Claims for '+year+'</td><td>'+fmtMoney(inv.totalApprovedForYear)+'</td></tr>'+
          '<tr><td>Total Unutilised Amount</td><td>'+fmtMoney(inv.totalUnutilized)+'</td></tr>'+
        '</tbody></table></div>'+
      '</details>'+
      '<details style="margin-top:12px;"><summary class="link-btn" style="cursor:pointer;">By Employee</summary>'+
        '<div class="table-wrap" style="margin-top:10px;"><table class="data-table">'+
        '<thead><tr><th>Employee</th><th>Entitlement</th><th>Approved Claims</th><th>Unutilised</th></tr></thead>'+
        '<tbody>'+empRows+'</tbody></table></div>'+
      '</details>'+
      '<div class="field-hint" style="margin-top:14px;">Credit note balance can be applied to offset next year\'s benefit charges.</div>'+
    '</div>';
  }

  function renderAdminReports(){
    var now = new Date();
    var currentYearValue = (STATE.reportYear!=null) ? String(STATE.reportYear) : String(now.getFullYear());
    var currentMonthValue = (STATE.reportMonth!=null) ? STATE.reportMonth : now.getMonth();
    var period = resolveReportPeriod(currentYearValue, currentMonthValue);
    var report = buildPeriodReport(STATE.claims, period.startDate, period.endDate);
    var yearOptions = buildReportYearOptions(STATE.claims);
    var isYtd = currentYearValue==='ytd';
    var searchQuery = (STATE.reportSearchQuery||'').trim().toLowerCase();
    var matchedCategories = searchQuery ? STATE.benefits.filter(function(b){ return b.toLowerCase().indexOf(searchQuery)!==-1; }) : [];
    var categoryScoped = matchedCategories.length > 0;

    var empRowData = STATE.profiles.filter(function(p){ return p.role==='user'; }).map(function(p){
      var r = report.byEmployee[p.id]||{count:0,total:0,categories:{}};
      var allCatKeys = Object.keys(r.categories||{});
      var nameMatches = searchQuery && p.name.toLowerCase().indexOf(searchQuery)!==-1;
      return {p:p, r:r, allCatKeys:allCatKeys, nameMatches:nameMatches};
    }).filter(function(row){
      if(!searchQuery) return true;
      if(row.nameMatches) return true;
      if(categoryScoped){ return row.allCatKeys.some(function(cat){ return matchedCategories.indexOf(cat)!==-1; }); }
      return false;
    }).map(function(row){
      var showCatKeys = (categoryScoped && !row.nameMatches) ? row.allCatKeys.filter(function(cat){ return matchedCategories.indexOf(cat)!==-1; }) : row.allCatKeys;
      var displayCount = 0, displayTotal = 0;
      showCatKeys.forEach(function(cat){ displayCount += row.r.categories[cat].count; displayTotal += row.r.categories[cat].total; });
      var pct = row.p.annual_allocation>0 ? (displayTotal/row.p.annual_allocation*100) : 0;
      var catBreakdown = showCatKeys.length
        ? showCatKeys.map(function(cat){ return escapeHtml(cat)+': '+fmtMoney(row.r.categories[cat].total); }).join(', ')
        : '-';
      return {name:row.p.name, count:displayCount, total:displayTotal, allocation:row.p.annual_allocation, pct:pct, catBreakdown:catBreakdown};
    });
    empRowData = sortRows(empRowData, STATE.reportSortColumn, STATE.reportSortDirection, {
      count: function(r){ return r.count; }, total: function(r){ return r.total; },
      allocation: function(r){ return r.allocation; }, pct: function(r){ return r.pct; }
    });
    var empRows = empRowData.map(function(r){
      return '<tr><td>'+escapeHtml(r.name)+'</td><td>'+r.count+'</td><td>'+fmtMoney(r.total)+'</td><td>'+fmtMoney(r.allocation)+'</td><td>'+r.pct.toFixed(1)+'%</td><td class="tiny">'+r.catBreakdown+'</td></tr>';
    }).join('');

    var rejSearchQuery = (STATE.rejectedSearchQuery||'').trim().toLowerCase();
    var rejRowData = Object.keys(report.byEmployeeRejected).map(function(empId){
      var r = report.byEmployeeRejected[empId];
      var reasonBreakdown = Object.keys(r.reasons).map(function(reason){
        var n = r.reasons[reason];
        return escapeHtml(reason)+(n>1 ? ' x'+n : '');
      }).join(', ');
      return {name:r.name, count:r.count, total:r.total, reasonBreakdown:reasonBreakdown};
    }).filter(function(row){
      if(!rejSearchQuery) return true;
      if(row.name.toLowerCase().indexOf(rejSearchQuery)!==-1) return true;
      return row.reasonBreakdown.toLowerCase().indexOf(rejSearchQuery)!==-1;
    });
    rejRowData = sortRows(rejRowData, STATE.rejectedSortColumn, STATE.rejectedSortDirection, {
      count: function(r){ return r.count; }, total: function(r){ return r.total; }
    });
    var rejectedRows = rejRowData.map(function(r){
      return '<tr><td>'+escapeHtml(r.name)+'</td><td>'+r.count+'</td><td>'+fmtMoney(r.total)+'</td><td class="tiny">'+r.reasonBreakdown+'</td></tr>';
    }).join('');

    return ''+
    '<div class="card"><div class="card-title">Monthly Utilisation Report</div>'+
      '<div class="report-controls">'+
        '<select data-action="set-report-month" '+(isYtd?'disabled':'')+'>'+REPORT_MONTH_NAMES.map(function(mn,i){ return '<option value="'+i+'" '+(i===currentMonthValue?'selected':'')+'>'+mn+'</option>'; }).join('')+'</select>'+
        '<select data-action="set-report-year">'+yearOptions.map(function(o){ return '<option value="'+o.value+'" '+(o.value===currentYearValue?'selected':'')+'>'+escapeHtml(o.label)+'</option>'; }).join('')+'</select>'+
        '<button class="btn btn-ghost btn-sm" data-action="export-report">Export to Excel</button>'+
        '<button class="btn btn-ghost btn-sm" data-action="export-report-pdf">Export to PDF for HR</button>'+
      '</div>'+
      '<div class="report-summary">'+escapeHtml(period.label)+' - Total claimed (approved): <strong>'+fmtMoney(report.totalClaimed)+'</strong> across <strong>'+report.totalCount+'</strong> submission(s). '+
        '<strong>'+report.totalRejectedCount+'</strong> submission(s) rejected, totaling <strong>'+fmtMoney(report.totalRejectedAmount)+'</strong>.</div>'+
    '</div>'+
    '<div class="card"><div class="card-title">By Employee</div>'+
      '<input type="text" id="report-search-input" class="search-input" placeholder="Search by employee name or benefit category..." value="'+escapeHtml(STATE.reportSearchQuery||'')+'" style="margin-bottom:12px;" />'+
      (categoryScoped ? '<div class="muted small" style="margin-bottom:10px;">Showing # Claims and Amount Claimed for '+matchedCategories.map(escapeHtml).join(', ')+' only.</div>' : '')+
      '<div class="table-wrap"><table class="data-table">'+
      '<thead><tr><th>Employee</th>'+
        '<th class="sortable-th" data-action="sort-report-emp" data-column="count"># Claims'+sortArrow('count',STATE.reportSortColumn,STATE.reportSortDirection)+'</th>'+
        '<th class="sortable-th" data-action="sort-report-emp" data-column="total">Amount Claimed'+sortArrow('total',STATE.reportSortColumn,STATE.reportSortDirection)+'</th>'+
        '<th class="sortable-th" data-action="sort-report-emp" data-column="allocation">Entitlement (SGD)'+sortArrow('allocation',STATE.reportSortColumn,STATE.reportSortDirection)+'</th>'+
        '<th class="sortable-th" data-action="sort-report-emp" data-column="pct">Utilisation %'+sortArrow('pct',STATE.reportSortColumn,STATE.reportSortDirection)+'</th>'+
        '<th>Category Breakdown</th></tr></thead><tbody>'+empRows+'</tbody></table></div>'+
    '</div>'+
    '<div class="card"><div class="card-title">Rejected Claims</div>'+
      '<input type="text" id="rejected-search-input" class="search-input" placeholder="Search by employee name or reason..." value="'+escapeHtml(STATE.rejectedSearchQuery||'')+'" style="margin-bottom:12px;" />'+
      (rejectedRows ? '<div class="table-wrap"><table class="data-table">'+
        '<thead><tr><th>Employee</th>'+
          '<th class="sortable-th" data-action="sort-report-rejected" data-column="count"># Claims Rejected'+sortArrow('count',STATE.rejectedSortColumn,STATE.rejectedSortDirection)+'</th>'+
          '<th class="sortable-th" data-action="sort-report-rejected" data-column="total">Amount Rejected'+sortArrow('total',STATE.rejectedSortColumn,STATE.rejectedSortDirection)+'</th>'+
          '<th>Reasons</th></tr></thead><tbody>'+rejectedRows+'</tbody></table></div>'
        : '<div class="empty-state">No rejected claims for this period.</div>')+
    '</div>';
  }

  function drawBarChart(doc, x, y, width, height, data, opts){
    opts = opts||{};
    var maxVal = Math.max.apply(null, data.map(function(d){ return d.value; })) || 1;
    var barCount = data.length;
    if(!barCount) return;
    var gap = 6;
    var barWidth = Math.min(28, (width - gap*(barCount-1)) / barCount);
    var usedWidth = barWidth*barCount + gap*(barCount-1);
    var startX = x + (width-usedWidth)/2;
    var chartBottom = y + height;
    doc.setDrawColor(210,210,210);
    doc.line(x, chartBottom, x+width, chartBottom);
    data.forEach(function(d, i){
      var barHeight = (d.value/maxVal) * (height-24);
      var barX = startX + i*(barWidth+gap);
      var barY = chartBottom - barHeight;
      doc.setFillColor(19,78,74);
      doc.rect(barX, barY, barWidth, barHeight, 'F');
      doc.setFontSize(7);
      doc.setTextColor(90,90,90);
      var valueLabel = opts.valueFormat ? opts.valueFormat(d.value) : String(d.value);
      doc.text(valueLabel, barX+barWidth/2, barY-3, {align:'center'});
      doc.setFontSize(7);
      doc.setTextColor(40,40,40);
      var labelLines = doc.splitTextToSize(d.label, barWidth+gap);
      doc.text(labelLines.slice(0,2), barX+barWidth/2, chartBottom+8, {align:'center'});
    });
  }

  function exportReportExcel(){
    if(typeof XLSX==='undefined'){ showToast('Excel export library did not load (needs an internet connection).', 'error'); return; }
    var now = new Date();
    var yearValue = (STATE.reportYear!=null) ? String(STATE.reportYear) : String(now.getFullYear());
    var monthValue = (STATE.reportMonth!=null) ? STATE.reportMonth : now.getMonth();
    var period = resolveReportPeriod(yearValue, monthValue);
    var report = buildPeriodReport(STATE.claims, period.startDate, period.endDate);

    var summaryData = [['Utilisation Report'],[period.label],[],
      ['Total Claimed (Approved)', Number(report.totalClaimed.toFixed(2))],
      ['Total Submissions', report.totalCount],
      ['Total Rejected Submissions', report.totalRejectedCount],
      ['Total Rejected Amount', Number(report.totalRejectedAmount.toFixed(2))]];
    var catData = [['Category','Number of Claims','Amount Claimed']];
    STATE.benefits.forEach(function(b){ var r=report.byCategory[b]||{count:0,total:0}; catData.push([b, r.count, Number(r.total.toFixed(2))]); });
    var empData = [['Employee','PayNow Mobile','Number of Claims','Amount Claimed','Entitlement (SGD)','Utilisation %']];
    STATE.profiles.filter(function(p){ return p.role==='user'; }).forEach(function(p){
      var r = report.byEmployee[p.id]||{count:0,total:0};
      var pct = p.annual_allocation>0 ? (r.total/p.annual_allocation*100) : 0;
      empData.push([p.name, p.paynow_mobile||'', r.count, Number(r.total.toFixed(2)), Number(p.annual_allocation), Number(pct.toFixed(1))]);
    });
    var rejData = [['Employee','Category','Amount','Reason']];
    report.rejectedClaims.forEach(function(rc){ rejData.push([rc.employeeName, rc.category, Number(rc.amount.toFixed(2)), rc.reason]); });

    try{
      var wb = XLSX.utils.book_new();
      var wsSummary = XLSX.utils.aoa_to_sheet(summaryData); wsSummary['!cols']=[{wch:28},{wch:16}];
      var wsCat = XLSX.utils.aoa_to_sheet(catData); wsCat['!cols']=[{wch:24},{wch:16},{wch:14}];
      var wsEmp = XLSX.utils.aoa_to_sheet(empData); wsEmp['!cols']=[{wch:24},{wch:16},{wch:14},{wch:14},{wch:16},{wch:14}];
      var wsRej = XLSX.utils.aoa_to_sheet(rejData); wsRej['!cols']=[{wch:24},{wch:18},{wch:12},{wch:40}];
      XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');
      XLSX.utils.book_append_sheet(wb, wsCat, 'By Category');
      XLSX.utils.book_append_sheet(wb, wsEmp, 'By Employee');
      XLSX.utils.book_append_sheet(wb, wsRej, 'Rejected Claims');
      XLSX.writeFile(wb, 'utilisation-report-'+period.fileSuffix+'.xlsx');
    }catch(err){
      console.error(err);
      showToast('Something went wrong building the Excel file.', 'error');
    }
  }

  function exportReportPDF(){
    if(typeof window.jspdf==='undefined' || !window.jspdf.jsPDF){ showToast('PDF export library did not load (needs an internet connection).', 'error'); return; }
    var now = new Date();
    var yearValue = (STATE.reportYear!=null) ? String(STATE.reportYear) : String(now.getFullYear());
    var monthValue = (STATE.reportMonth!=null) ? STATE.reportMonth : now.getMonth();
    var period = resolveReportPeriod(yearValue, monthValue);
    var report = buildPeriodReport(STATE.claims, period.startDate, period.endDate);
    var periodLabel = period.label;
    var employees = STATE.profiles.filter(function(p){ return p.role==='user'; });

    var empStats = employees.map(function(p){
      var r = report.byEmployee[p.id]||{count:0,total:0};
      var pct = p.annual_allocation>0 ? (r.total/p.annual_allocation*100) : 0;
      return {name:p.name, count:r.count, total:r.total, allocation:Number(p.annual_allocation)||0, pct:pct};
    });
    var totalEntitlementPool = employees.reduce(function(s,p){ return s+(Number(p.annual_allocation)||0); }, 0);
    var overallUtilPct = totalEntitlementPool>0 ? (report.totalClaimed/totalEntitlementPool*100) : 0;
    var zeroUsageCount = empStats.filter(function(e){ return e.count===0; }).length;
    var highUsageCount = empStats.filter(function(e){ return e.pct>=80; }).length;
    var categoryTotals = STATE.benefits.map(function(b){ return {name:b, total:(report.byCategory[b]||{total:0}).total}; }).sort(function(a,b){ return b.total-a.total; });
    var topCategory = categoryTotals.length && categoryTotals[0].total>0 ? categoryTotals[0] : null;
    var rejectionReasonCounts = {};
    report.rejectedClaims.forEach(function(rc){ rejectionReasonCounts[rc.reason] = (rejectionReasonCounts[rc.reason]||0)+1; });
    var topRejectionReason = Object.keys(rejectionReasonCounts).sort(function(a,b){ return rejectionReasonCounts[b]-rejectionReasonCounts[a]; })[0];
    var totalSubmissions = report.totalCount + report.totalRejectedCount;
    var rejectionRate = totalSubmissions>0 ? (report.totalRejectedCount/totalSubmissions*100) : 0;

    try{
      var doc = new window.jspdf.jsPDF({unit:'mm', format:'a4'});
      var pageWidth = doc.internal.pageSize.getWidth();
      var pageHeight = doc.internal.pageSize.getHeight();
      var margin = 15;
      var brandColor = [19,78,74];

      /* ---- Page 1: Cover, Key Metrics, Key Insights ---- */
      doc.setFillColor(brandColor[0],brandColor[1],brandColor[2]);
      doc.rect(0, 0, pageWidth, 38, 'F');
      doc.setTextColor(255,255,255);
      doc.setFontSize(19);
      doc.text('Flex Benefits Portal', margin, 18);
      doc.setFontSize(11);
      doc.text('Monthly Utilisation Report - '+periodLabel, margin, 27);
      doc.setFontSize(9);
      doc.text('Cresco Insurance Agency Pte Ltd  |  Prepared for HR', margin, 34);

      doc.setTextColor(40,40,40);
      doc.setFontSize(9);
      doc.text('Generated '+fmtDate(todayStr()), margin, 46);

      var cy = 54;
      doc.setFontSize(13); doc.setTextColor(brandColor[0],brandColor[1],brandColor[2]);
      doc.text('Key Metrics', margin, cy);
      var metrics = [
        ['Total Claimed (Approved)', fmtMoney(report.totalClaimed)+' SGD'],
        ['Total Entitlement Pool', fmtMoney(totalEntitlementPool)+' SGD'],
        ['Overall Utilisation', overallUtilPct.toFixed(1)+'%'],
        ['Approved Submissions', String(report.totalCount)],
        ['Rejected Submissions', report.totalRejectedCount+' ('+rejectionRate.toFixed(1)+'% rejection rate)'],
        ['Employees With Zero Usage', zeroUsageCount+' of '+employees.length],
        ['Employees Above 80% Utilisation', String(highUsageCount)]
      ];
      doc.autoTable({
        startY: cy+4, margin:{left:margin, right:margin},
        body: metrics, theme:'plain', styles:{fontSize:10, cellPadding:1.5},
        columnStyles:{0:{fontStyle:'bold', cellWidth:85}}
      });
      cy = doc.lastAutoTable.finalY + 10;

      doc.setFontSize(13); doc.setTextColor(brandColor[0],brandColor[1],brandColor[2]);
      doc.text('Key Insights', margin, cy); cy += 6;
      doc.setFontSize(10); doc.setTextColor(40,40,40);
      var insights = [];
      if(topCategory) insights.push('The most utilised benefit this period is '+topCategory.name+', accounting for '+fmtMoney(topCategory.total)+' SGD.');
      if(zeroUsageCount>0) insights.push(zeroUsageCount+' employee(s) submitted no claims this period - consider a reminder or awareness push.');
      if(highUsageCount>0) insights.push(highUsageCount+' employee(s) have used 80% or more of their entitlement this period.');
      if(topRejectionReason) insights.push('The most common rejection reason is "'+topRejectionReason+'" ('+rejectionReasonCounts[topRejectionReason]+' occurrence(s)).');
      if(!insights.length) insights.push('No notable trends to highlight for this period.');
      insights.forEach(function(line){
        var split = doc.splitTextToSize('- '+line, pageWidth-margin*2-4);
        doc.text(split, margin, cy);
        cy += split.length*5 + 2;
      });

      var catChartData = STATE.benefits.map(function(b){
        var r = report.byCategory[b]||{count:0,total:0};
        return {label:b, value:Number(r.total.toFixed(2))};
      });
      cy += 8;
      if(cy > pageHeight-75){ doc.addPage(); cy = 20; }
      doc.setFontSize(12); doc.setTextColor(brandColor[0],brandColor[1],brandColor[2]);
      doc.text('Amount Claimed by Category', margin, cy);
      drawBarChart(doc, margin, cy+6, pageWidth-margin*2, 55, catChartData, {valueFormat:function(v){ return fmtMoney(v); }});

      /* ---- Page: Category + Employee tables ---- */
      doc.addPage();
      doc.setFontSize(14); doc.setTextColor(brandColor[0],brandColor[1],brandColor[2]);
      doc.text('By Benefit Category', margin, 18);
      var catRows = STATE.benefits.map(function(b){
        var r = report.byCategory[b]||{count:0,total:0};
        return [b, String(r.count), fmtMoney(r.total)];
      });
      doc.autoTable({
        startY: 24, margin:{left:margin, right:margin},
        head:[['Category','# Claims','Amount Claimed (SGD)']], body: catRows,
        theme:'grid', headStyles:{fillColor:brandColor}, styles:{fontSize:9}
      });

      var empSorted = empStats.slice().sort(function(a,b){ return b.pct-a.pct; });
      var empChartTop = doc.lastAutoTable.finalY + 14;
      doc.setFontSize(12); doc.setTextColor(brandColor[0],brandColor[1],brandColor[2]);
      doc.text('Top Employees by Amount Claimed', margin, empChartTop);
      var topEmp = empStats.slice().sort(function(a,b){ return b.total-a.total; }).slice(0,8)
        .map(function(e){ return {label:e.name, value:Number(e.total.toFixed(2))}; });
      if(topEmp.length){
        drawBarChart(doc, margin, empChartTop+6, pageWidth-margin*2, 55, topEmp, {valueFormat:function(v){ return fmtMoney(v); }});
      } else {
        doc.setFontSize(9); doc.setTextColor(120,120,120);
        doc.text('No approved claims this period.', margin, empChartTop+15);
      }

      /* ---- Page: Full employee table, sorted by utilisation ---- */
      doc.addPage();
      doc.setFontSize(14); doc.setTextColor(brandColor[0],brandColor[1],brandColor[2]);
      doc.text('By Employee - '+periodLabel, margin, 18);
      var empRows = empSorted.map(function(e){
        return [e.name, String(e.count), fmtMoney(e.total), fmtMoney(e.allocation), e.pct.toFixed(1)+'%'];
      });
      doc.autoTable({
        startY: 24, margin:{left:margin, right:margin},
        head:[['Employee','# Claims','Amount Claimed (SGD)','Entitlement (SGD)','Utilisation %']], body: empRows,
        theme:'grid', headStyles:{fillColor:brandColor}, styles:{fontSize:9}
      });

      /* ---- Page: Rejected claims ---- */
      doc.addPage();
      doc.setFontSize(14); doc.setTextColor(brandColor[0],brandColor[1],brandColor[2]);
      doc.text('Rejected Claims - '+periodLabel, margin, 18);
      if(report.rejectedClaims.length){
        var rejRows = report.rejectedClaims.map(function(rc){
          return [rc.employeeName, rc.category, fmtMoney(rc.amount), rc.reason];
        });
        doc.autoTable({
          startY: 24, margin:{left:margin, right:margin},
          head:[['Employee','Category','Amount (SGD)','Reason']], body: rejRows,
          theme:'grid', headStyles:{fillColor:brandColor}, styles:{fontSize:8},
          columnStyles:{3:{cellWidth:70}}
        });
      } else {
        doc.setFontSize(10); doc.setTextColor(120,120,120);
        doc.text('No rejected claims this period.', margin, 30);
      }

      doc.save('flex-benefits-hr-report-'+period.fileSuffix+'.pdf');
    }catch(err){
      console.error(err);
      showToast('Could not generate the PDF. Check the console for details.', 'error');
    }
  }

  function exportInvoicePDF(){
    if(typeof window.jspdf==='undefined' || !window.jspdf.jsPDF){ showToast('PDF export library did not load (needs an internet connection).', 'error'); return; }
    var now = new Date();
    var year = (STATE.invoiceYear!=null) ? STATE.invoiceYear : (now.getFullYear()-1);
    var inv = computeAnnualInvoice(year);
    var invoiceDate = '2 Jan '+(year+1);
    var adjustmentLabel = inv.adjustmentAmount>=0 ? 'Additional Headcount Charge' : 'Headcount Reduction Credit';

    try{
      var doc = new window.jspdf.jsPDF({unit:'mm', format:'a4'});
      var pageWidth = doc.internal.pageSize.getWidth();
      var margin = 15;
      var brandColor = [19,78,74];

      doc.setFillColor(brandColor[0],brandColor[1],brandColor[2]);
      doc.rect(0, 0, pageWidth, 38, 'F');
      var logoW = 42, logoH = logoW*(90/285);
      doc.setFillColor(255,255,255);
      doc.roundedRect(margin-4, 7, logoW+8, logoH+8, 2, 2, 'F');
      doc.addImage(CRESCO_LOGO_DATA_URI, 'PNG', margin, 11, logoW, logoH);
      doc.setTextColor(255,255,255);
      doc.setFontSize(15);
      doc.text('Annual Invoice', pageWidth-margin, 17, {align:'right'});
      doc.setFontSize(10);
      doc.text('Headcount Adjustment & Credit Note', pageWidth-margin, 24, {align:'right'});
      doc.setFontSize(9);
      doc.text('Flex Benefits Portal by Cresco Insurance Agency Pte Ltd', pageWidth-margin, 32, {align:'right'});

      doc.setTextColor(40,40,40);
      doc.setFontSize(9);
      doc.text('Invoice Date: '+invoiceDate, margin, 46);
      doc.text('Period Covered: 1 Jan '+year+' - 31 Dec '+year, margin, 52);

      var cy = 62;
      doc.setFontSize(13); doc.setTextColor(brandColor[0],brandColor[1],brandColor[2]);
      doc.text('Headcount Adjustment', margin, cy);
      doc.autoTable({
        startY: cy+4, margin:{left:margin, right:margin},
        body: [
          ['Headcount as at 1 Jan '+year, String(inv.startHeadcount)],
          ['Headcount as at 31 Dec '+year, String(inv.endHeadcount)],
          ['Net Change', String(inv.headcountDelta)],
          ['Adjustment Units (Net Change / 2)', String(inv.adjustmentUnits)],
          ['Rate per Headcount per Year', fmtMoney(inv.rate)],
          [adjustmentLabel, fmtMoney(Math.abs(inv.adjustmentAmount))]
        ],
        theme:'plain', styles:{fontSize:10, cellPadding:1.5},
        columnStyles:{0:{fontStyle:'bold', cellWidth:110}}
      });
      cy = doc.lastAutoTable.finalY + 12;

      doc.setFontSize(13); doc.setTextColor(brandColor[0],brandColor[1],brandColor[2]);
      doc.text('Unutilised Benefit (Credit Note)', margin, cy);
      doc.autoTable({
        startY: cy+4, margin:{left:margin, right:margin},
        body: [
          ['Total Entitlement Pool for '+year, fmtMoney(inv.totalEntitlementPool)],
          ['Total Approved Claims for '+year, fmtMoney(inv.totalApprovedForYear)],
          ['Total Unutilised Amount', fmtMoney(inv.totalUnutilized)]
        ],
        theme:'plain', styles:{fontSize:10, cellPadding:1.5},
        columnStyles:{0:{fontStyle:'bold', cellWidth:110}}
      });
      cy = doc.lastAutoTable.finalY + 12;

      doc.setFontSize(13); doc.setTextColor(brandColor[0],brandColor[1],brandColor[2]);
      doc.text('Invoice Summary', margin, cy);
      doc.autoTable({
        startY: cy+4, margin:{left:margin, right:margin},
        body: [
          ['Additional Headcount Charge', fmtMoney(inv.additionalCharge)],
          ['Less: Credit Note (Unutilised + Headcount Reduction)', '-'+fmtMoney(inv.creditNoteAmount)],
          [inv.netAmount>=0?'Net Amount Due':'Net Credit Balance', fmtMoney(Math.abs(inv.netAmount))],
          ['Invoice Payable Amount', fmtMoney(inv.invoicePayableAmount)]
        ],
        theme:'grid', headStyles:{fillColor:brandColor}, styles:{fontSize:10, cellPadding:2},
        columnStyles:{0:{fontStyle:'bold', cellWidth:110}}
      });
      cy = doc.lastAutoTable.finalY + 10;
      doc.setFontSize(8); doc.setTextColor(120,120,120);
      var noteLines = doc.splitTextToSize('Note: Any credit note balance may be applied to offset the following year\'s flex benefit charges.', pageWidth-margin*2);
      doc.text(noteLines, margin, cy);

      doc.addPage();
      doc.setFontSize(14); doc.setTextColor(brandColor[0],brandColor[1],brandColor[2]);
      doc.text('Headcount as at 1 Jan '+year+' - by Employee', margin, 18);
      doc.setFontSize(9); doc.setTextColor(100,100,100);
      doc.text('Supporting detail for the headcount adjustment above. '+inv.startHeadcountList.length+' employee(s) counted.', margin, 24);
      if(inv.startHeadcountList.length){
        var startHcRows = inv.startHeadcountList.map(function(e){ return [e.name, fmtMoney(e.allocation)]; });
        doc.autoTable({
          startY: 30, margin:{left:margin, right:margin},
          head:[['Employee','Annual Allocation (SGD)']], body: startHcRows,
          theme:'grid', headStyles:{fillColor:brandColor}, styles:{fontSize:9}
        });
      } else {
        doc.setFontSize(10); doc.setTextColor(120,120,120);
        doc.text('No employees on record as at 1 Jan '+year+'.', margin, 34);
      }

      doc.addPage();
      doc.setFontSize(14); doc.setTextColor(brandColor[0],brandColor[1],brandColor[2]);
      doc.text('Membership Changes in '+year, margin, 18);
      doc.setFontSize(9); doc.setTextColor(100,100,100);
      doc.text('Employees who joined or were terminated during the year - the movements behind the net change above.', margin, 24);
      if(inv.membershipChanges.length){
        var changeRows = inv.membershipChanges.map(function(e){ return [e.name, e.change, fmtDate(e.date), fmtMoney(e.allocation)]; });
        doc.autoTable({
          startY: 30, margin:{left:margin, right:margin},
          head:[['Employee','Change','Date','Annual Allocation (SGD)']], body: changeRows,
          theme:'grid', headStyles:{fillColor:brandColor}, styles:{fontSize:9}
        });
      } else {
        doc.setFontSize(10); doc.setTextColor(120,120,120);
        doc.text('No joiners or terminations recorded in '+year+'.', margin, 34);
      }

      doc.addPage();
      doc.setFontSize(14); doc.setTextColor(brandColor[0],brandColor[1],brandColor[2]);
      doc.text('Unutilised Amount by Employee - '+year, margin, 18);
      var empRows = inv.unutilizedByEmployee.map(function(e){
        return [e.name, fmtMoney(e.allocation), fmtMoney(e.approved), fmtMoney(e.unutilized)];
      });
      doc.autoTable({
        startY: 24, margin:{left:margin, right:margin},
        head:[['Employee','Entitlement (SGD)','Approved Claims (SGD)','Unutilised (SGD)']], body: empRows,
        theme:'grid', headStyles:{fillColor:brandColor}, styles:{fontSize:9}
      });

      doc.save('flex-benefits-invoice-'+year+'.pdf');
    }catch(err){
      console.error(err);
      showToast('Could not generate the invoice PDF. Check the console for details.', 'error');
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

  function doResetPassword(form){
    var password = form.password.value;
    var confirmPassword = form.confirmPassword.value;
    if(password !== confirmPassword){ STATE.authError='Passwords do not match.'; render(); return Promise.resolve(); }
    if(password.length < 6){ STATE.authError='Password must be at least 6 characters.'; render(); return Promise.resolve(); }
    STATE.authError='';
    var btn = form.querySelector('button[type=submit]');
    btn.disabled = true; btn.textContent = 'Saving...';
    return supabase.auth.updateUser({password:password}).then(function(res){
      if(res.error){ STATE.authError = res.error.message; render(); return; }
      return supabase.auth.signOut().then(function(){
        STATE.session=null; STATE.profile=null; STATE.authView='login'; STATE.authError='';
        STATE.authInfo='Password updated! Please log in with your new password.';
        render();
      });
    }).catch(function(err){
      STATE.authError = (err && err.message) || String(err); render();
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
    var redirectTo = window.location.origin + window.location.pathname;
    return supabase.auth.signUp({email:email, password:password, options:{emailRedirectTo:redirectTo}}).then(function(res){
      if(res.error){
        var msg = res.error.message || '';
        if(/already registered|already exists|already been registered/i.test(msg)){
          STATE.authError = 'This email is already registered. Please log in instead.';
          showToast('This email is already registered - try logging in instead.', 'error');
        } else {
          STATE.authError = msg;
          render();
        }
        return;
      }
      var alreadyRegistered = res.data && res.data.user && Array.isArray(res.data.user.identities) && res.data.user.identities.length===0;
      if(alreadyRegistered){
        STATE.authError = 'This email is already registered. Please log in instead.';
        showToast('This email is already registered - try logging in instead.', 'error');
        return;
      }
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
    STATE.authError = ''; render();
    var btn = document.querySelector('[data-action="forgot-password"]');
    var originalLabel = btn ? btn.textContent : '';
    if(btn){ btn.disabled = true; btn.textContent = 'Sending...'; }
    var redirectTo = window.location.origin + window.location.pathname;
    return withTimeout(supabase.auth.resetPasswordForEmail(email, {redirectTo:redirectTo}), 8000, 'Password reset request').then(function(res){
      if(res.error){ showToast('Could not send reset email: '+res.error.message, 'error'); return; }
      STATE.modal = {title:'Check your email', message:'We\'ve sent a password reset link to '+email+'. Check your inbox (and spam folder) for an email from noreply@cresco.sg.'};
      render();
    }).catch(function(err){
      showToast('Could not send reset email: '+((err && err.message) || err), 'error');
    }).then(function(){
      if(btn){ btn.disabled = false; btn.textContent = originalLabel || 'Forgot password?'; }
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
    var currency = form.currency.value || 'SGD';
    var amount = parseFloat(form.amount.value);
    var receiptDate = form.receiptDate.value;
    var file = form.receipt.files[0];
    if(!category || !vendor || !amount || amount<=0 || !receiptDate || !file){ showToast('Please complete all fields.', 'error'); return Promise.resolve(); }
    if(file.size > 4*1024*1024){ showToast('File too large - please upload a file under 4MB.', 'error'); return Promise.resolve(); }

    var currentYear = new Date().getFullYear();
    var receiptYear = new Date(receiptDate+'T00:00:00').getFullYear();
    if(receiptYear !== currentYear){
      STATE.claimFormError = 'This receipt is dated '+fmtDate(receiptDate)+', which is not from '+currentYear+'. Only '+currentYear+' receipts can be claimed - your benefits reset every 1 January.';
      render();
      return Promise.resolve();
    }

    var btn = form.querySelector('button[type=submit]');
    btn.disabled = true; btn.textContent = 'Checking exchange rate...';

    return getExchangeRateToSGD(currency).then(function(rate){
      var amountSgd = Math.round(amount*rate*100)/100;
      var wallet = computeWallet(STATE.profile.id);
      if(amountSgd > wallet.available){
        STATE.claimFormError = 'This comes to '+fmtMoney(amountSgd)+' SGD, which is more than your available balance of '+fmtMoney(wallet.available)+'.';
        render();
        return null;
      }
      STATE.claimFormError = null;
      btn.textContent = 'Uploading...';
      return uploadReceipt(file).then(function(receipt){
        return supabase.from('claims').insert({
          employee_id: STATE.session.user.id, category:category, vendor:vendor,
          amount:amount, currency:currency, amount_sgd:amountSgd, exchange_rate:rate,
          receipt_date:receiptDate, receipt_path:receipt.path, receipt_name:receipt.name, status:'pending'
        });
      });
    }).then(function(res){
      if(res===null) return;
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
    var otherInput = document.querySelector('[data-field="reject-other-'+id+'"]');
    var reason = reasonSel ? reasonSel.value : '';
    if(!reason){ showToast('Please select a rejection reason.', 'error'); return Promise.resolve(); }
    if(reason==='Others'){
      var customReason = otherInput ? otherInput.value.trim() : '';
      if(!customReason){ showToast('Please specify a reason.', 'error'); return Promise.resolve(); }
      reason = customReason;
    }
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
    var currencySel = document.getElementById('edit-currency-'+id);
    var amtInput = document.getElementById('edit-amount-'+id);
    var dateInput = document.getElementById('edit-date-'+id);
    var fileInput = document.getElementById('edit-receipt-'+id);
    var category = catSel ? catSel.value : claim.category;
    var vendor = vendorInput ? vendorInput.value.trim() : claim.vendor;
    var currency = currencySel ? currencySel.value : (claim.currency||'SGD');
    var amount = amtInput ? parseFloat(amtInput.value) : claim.amount;
    var receiptDate = dateInput ? dateInput.value : claim.receipt_date;
    if(!category || !vendor || !amount || amount<=0 || !receiptDate){ showToast('Please complete all fields.', 'error'); return Promise.resolve(); }

    var currentYear = new Date().getFullYear();
    var receiptYear = new Date(receiptDate+'T00:00:00').getFullYear();
    if(receiptYear !== currentYear){
      STATE.claimFormError = 'This receipt is dated '+fmtDate(receiptDate)+', which is not from '+currentYear+'. Only '+currentYear+' receipts can be claimed - your benefits reset every 1 January.';
      render();
      return Promise.resolve();
    }

    var file = fileInput && fileInput.files && fileInput.files[0];
    var wasRejected = claim.status === 'rejected';

    return getExchangeRateToSGD(currency).then(function(rate){
      var amountSgd = Math.round(amount*rate*100)/100;
      var wallet = computeWallet(STATE.profile.id);
      var availableForThisEdit = claim.status==='pending' ? wallet.available + sgdAmountOf(claim) : wallet.available;
      if(amountSgd > availableForThisEdit){
        STATE.claimFormError = 'This comes to '+fmtMoney(amountSgd)+' SGD, which is more than your available balance of '+fmtMoney(availableForThisEdit)+'.';
        render();
        return null;
      }
      STATE.claimFormError = null;

      var updates = {category:category, vendor:vendor, currency:currency, amount:amount, amount_sgd:amountSgd, exchange_rate:rate, receipt_date:receiptDate, last_edited_at:new Date().toISOString()};
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
        if(file.size > 4*1024*1024){ showToast('File too large - please upload a file under 4MB.', 'error'); return null; }
        return uploadReceipt(file).then(function(receipt){
          updates.receipt_path = receipt.path; updates.receipt_name = receipt.name;
          return applyUpdate();
        }).catch(function(err){ showToast('Upload failed: '+(err.message||err), 'error'); });
      }
      return applyUpdate();
    }).catch(function(err){
      console.error(err);
      showToast('Could not fetch the exchange rate: '+(err.message||err), 'error');
    });
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
    var dateOfEmployment = form.dateOfEmployment.value;
    var effectiveDate = form.effectiveDate.value;
    var paynowMobile = form.paynowMobile.value.trim();
    var allocRaw = form.annualAllocation.value;
    var alloc = parseFloat(allocRaw);
    if(!name || !email || !dateOfEmployment || !effectiveDate || !paynowMobile || allocRaw==='' || isNaN(alloc)){
      showToast('Please complete all fields before adding the employee.', 'error');
      return Promise.resolve();
    }
    return supabase.from('invites').upsert(
      {email:email, name:name, role:'user', annual_allocation:alloc, date_of_joining:dateOfEmployment, paynow_mobile:paynowMobile, effective_date:effectiveDate, welcome_email_sent:false, invited_by:STATE.session.user.id, used:false},
      {onConflict:'email'}
    ).then(function(res){
      if(res.error){ showToast('Could not add employee: '+res.error.message, 'error'); return; }
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
        var dateOfJoining = parts[3] && parts[3].length ? parts[3] : null;
        var paynowMobile = parts[4] && parts[4].length ? parts[4] : null;
        var effectiveDate = parts[5] && parts[5].length ? parts[5] : null;
        if(!name || !email) continue;
        rows.push({email:email, name:name, role:'user', annual_allocation:alloc, date_of_joining:dateOfJoining, paynow_mobile:paynowMobile, effective_date:effectiveDate, welcome_email_sent:false, invited_by:STATE.session.user.id, used:false});
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
    var newActive = !p.active;
    var updates = {active:newActive, deactivated_at: newActive ? null : new Date().toISOString()};
    return supabase.from('profiles').update(updates).eq('id', id).then(function(res){
      if(res.error){ showToast('Could not update status: '+res.error.message, 'error'); return; }
      showToast(p.name+(newActive?' activated.':' deactivated.'), 'success');
      return loadAppData();
    }).then(function(){ render(); });
  }

  function deletePermanently(id){
    STATE.confirmDeleteProfileId = null;
    var p = profileById(id);
    if(!p){ render(); return Promise.resolve(); }
    if(p.id === STATE.profile.id){ showToast('You cannot delete your own account.', 'error'); render(); return Promise.resolve(); }
    if(p.role==='admin'){
      var activeAdmins = STATE.profiles.filter(function(x){ return x.role==='admin' && x.active; }).length;
      if(activeAdmins<=1){ showToast('At least one active admin is required.', 'error'); render(); return Promise.resolve(); }
    }
    return supabase.from('profiles').delete().eq('id', id).then(function(res){
      if(res.error){ showToast('Could not delete: '+res.error.message, 'error'); return; }
      showToast(p.name+' permanently deleted.', 'success');
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

  function saveTermination(id){
    var input = document.getElementById('termination-input-'+id);
    var val = input ? input.value : '';
    STATE.editingTerminationId = null;
    return supabase.from('profiles').update({date_of_termination: val || null}).eq('id', id).then(function(res){
      if(res.error){ showToast('Could not update date of termination: '+res.error.message, 'error'); return; }
      showToast('Date of termination updated.', 'success');
      return loadAppData();
    }).then(function(){ render(); });
  }

  function saveInvoiceRate(){
    var input = document.getElementById('invoice-rate-input');
    var val = input ? parseFloat(input.value) : NaN;
    if(isNaN(val) || val<0){ showToast('Please enter a valid rate.', 'error'); return Promise.resolve(); }
    STATE.editingInvoiceRate = false;
    return supabase.from('app_settings').upsert({key:'invoice_rate_per_head', value:String(val)}, {onConflict:'key'}).then(function(res){
      if(res.error){ showToast('Could not update rate: '+res.error.message, 'error'); return; }
      showToast('Charge per headcount per year updated.', 'success');
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
      case 'buy-travel-insurance': window.open('https://sg-customer.qbe.com/travel/partner/01000960', '_blank', 'noopener,noreferrer'); return Promise.resolve();
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
      case 'edit-termination': STATE.editingTerminationId=id; render(); return Promise.resolve();
      case 'save-termination': return saveTermination(id);
      case 'toggle-active': STATE.confirmDeactivateId=id; STATE.confirmDeleteProfileId=null; render(); return Promise.resolve();
      case 'toggle-active-cancel': STATE.confirmDeactivateId=null; render(); return Promise.resolve();
      case 'toggle-active-confirm': return toggleActiveConfirmed(id);
      case 'delete-profile': STATE.confirmDeleteProfileId=id; STATE.confirmDeactivateId=null; render(); return Promise.resolve();
      case 'delete-profile-cancel': STATE.confirmDeleteProfileId=null; render(); return Promise.resolve();
      case 'delete-profile-confirm': return deletePermanently(id);
      case 'revoke-invite': STATE.confirmRevokeInvite=btn.dataset.email; render(); return Promise.resolve();
      case 'revoke-invite-cancel': STATE.confirmRevokeInvite=null; render(); return Promise.resolve();
      case 'sort-report-emp': {
        var col = btn.dataset.column;
        if(STATE.reportSortColumn===col){ STATE.reportSortDirection = STATE.reportSortDirection==='desc'?'asc':'desc'; }
        else { STATE.reportSortColumn = col; STATE.reportSortDirection = 'desc'; }
        render(); return Promise.resolve();
      }
      case 'sort-report-rejected': {
        var rcol = btn.dataset.column;
        if(STATE.rejectedSortColumn===rcol){ STATE.rejectedSortDirection = STATE.rejectedSortDirection==='desc'?'asc':'desc'; }
        else { STATE.rejectedSortColumn = rcol; STATE.rejectedSortDirection = 'desc'; }
        render(); return Promise.resolve();
      }
      case 'revoke-invite-confirm': return revokeInviteConfirmed(btn.dataset.email);
      case 'remove-benefit': return removeBenefit(btn.dataset.cat);
      case 'export-report': exportReportExcel(); return Promise.resolve();
      case 'export-report-pdf': exportReportPDF(); return Promise.resolve();
      case 'edit-invoice-rate': STATE.editingInvoiceRate=true; render(); return Promise.resolve();
      case 'save-invoice-rate': return saveInvoiceRate();
      case 'export-invoice-pdf': exportInvoicePDF(); return Promise.resolve();
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
    if(type==='reset-password') return doResetPassword(form);
    if(type==='submit-claim') return submitClaim(form);
    if(type==='invite-staff') return inviteStaff(form);
    if(type==='add-benefit') return addBenefit(form);
    return Promise.resolve();
  }

  function toggleOtherReasonField(selectEl){
    var id = selectEl.dataset.id;
    var wrap = document.getElementById('reject-other-wrap-'+id);
    if(!wrap) return;
    wrap.style.display = (selectEl.value === 'Others') ? '' : 'none';
  }

  function handleChange(e){
    var target = e.target;
    if(target.id==='staff-csv-input'){
      var f = target.files[0]; target.value='';
      return handleStaffCsv(f);
    }
    if(target.id==='claim-currency-input' || (target.id && target.id.indexOf('edit-currency-')===0)){
      handleAmountRelatedChange(target);
      return Promise.resolve();
    }
    var action = target.dataset.action;
    if(!action) return Promise.resolve();
    switch(action){
      case 'change-role': return changeRole(target.dataset.id, target.value);
      case 'reject-reason-select': toggleOtherReasonField(target); return Promise.resolve();
      case 'set-report-month': STATE.reportMonth = parseInt(target.value,10); render(); return Promise.resolve();
      case 'set-report-year': STATE.reportYear = (target.value==='ytd') ? 'ytd' : parseInt(target.value,10); render(); return Promise.resolve();
      case 'set-invoice-year': STATE.invoiceYear = parseInt(target.value,10); render(); return Promise.resolve();
      default: return Promise.resolve();
    }
  }

  var liveCheckTimers = {};
  var liveCheckGeneration = {};

  function scheduleLiveAmountCheck(amountInput, currencySelect, available, errorId, previewId){
    clearTimeout(liveCheckTimers[errorId]);
    liveCheckTimers[errorId] = setTimeout(function(){
      var myGen = (liveCheckGeneration[errorId] = (liveCheckGeneration[errorId]||0) + 1);
      var currency = currencySelect ? currencySelect.value : 'SGD';
      var rawAmount = parseFloat(amountInput.value);
      var previewEl = previewId ? document.getElementById(previewId) : null;
      var errorEl = document.getElementById(errorId);
      if(isNaN(rawAmount) || rawAmount<=0){
        if(errorEl){ errorEl.textContent=''; errorEl.style.display='none'; }
        if(previewEl) previewEl.textContent = '';
        return;
      }
      getExchangeRateToSGD(currency).then(function(rate){
        if(liveCheckGeneration[errorId] !== myGen) return;
        var sgdAmount = Math.round(rawAmount*rate*100)/100;
        if(previewEl){
          previewEl.textContent = currency!=='SGD' ? ('\u2248 '+fmtMoney(sgdAmount)+' SGD at today\'s rate') : '';
        }
        if(errorEl){
          if(sgdAmount > available){
            errorEl.textContent = 'This comes to '+fmtMoney(sgdAmount)+' SGD, which is more than your available balance of '+fmtMoney(available)+'.';
            errorEl.style.display = '';
          } else {
            errorEl.textContent=''; errorEl.style.display='none';
          }
        }
      }).catch(function(err){
        if(liveCheckGeneration[errorId] !== myGen) return;
        if(errorEl){ errorEl.textContent = 'Could not fetch the exchange rate: '+((err&&err.message)||err); errorEl.style.display=''; }
        if(previewEl) previewEl.textContent = '';
      });
    }, 350);
  }

  var searchDebounceTimers = {};
  function scheduleSearchFilter(inputEl, stateKey){
    var value = inputEl.value;
    var cursorPos = inputEl.selectionStart;
    var inputId = inputEl.id;
    clearTimeout(searchDebounceTimers[inputId]);
    searchDebounceTimers[inputId] = setTimeout(function(){
      STATE[stateKey] = value;
      render();
      var freshInput = document.getElementById(inputId);
      if(freshInput){
        freshInput.focus();
        try{ freshInput.setSelectionRange(cursorPos, cursorPos); }catch(err){}
      }
    }, 250);
  }

  function handleInput(e){
    var t = e.target;
    if(!STATE.profile) return;
    if(t.id==='claim-amount-input'){
      var wallet = computeWallet(STATE.profile.id);
      var currencySel = document.getElementById('claim-currency-input');
      scheduleLiveAmountCheck(t, currencySel, wallet.available, 'claim-amount-live-error', 'claim-amount-preview');
    } else if(t.id && t.id.indexOf('edit-amount-')===0){
      var claimId = t.id.slice('edit-amount-'.length);
      var claim = STATE.claims.filter(function(c){ return c.id===claimId; })[0];
      if(claim){
        var w = computeWallet(STATE.profile.id);
        var availableForEdit = claim.status==='pending' ? w.available + sgdAmountOf(claim) : w.available;
        var editCurrencySel = document.getElementById('edit-currency-'+claimId);
        scheduleLiveAmountCheck(t, editCurrencySel, availableForEdit, 'edit-amount-live-error-'+claimId, 'edit-amount-preview-'+claimId);
      }
    } else if(t.id==='history-search-input'){
      scheduleSearchFilter(t, 'historySearchQuery');
    } else if(t.id==='all-submissions-search-input'){
      scheduleSearchFilter(t, 'allSubmissionsSearchQuery');
    } else if(t.id==='report-search-input'){
      scheduleSearchFilter(t, 'reportSearchQuery');
    } else if(t.id==='rejected-search-input'){
      scheduleSearchFilter(t, 'rejectedSearchQuery');
    }
  }

  function handleAmountRelatedChange(target){
    if(target.id==='claim-currency-input'){
      var amtInput = document.getElementById('claim-amount-input');
      if(amtInput && amtInput.value){ handleInput({target:amtInput}); }
    } else if(target.id && target.id.indexOf('edit-currency-')===0){
      var claimId = target.id.slice('edit-currency-'.length);
      var amtEl = document.getElementById('edit-amount-'+claimId);
      if(amtEl && amtEl.value){ handleInput({target:amtEl}); }
    }
  }

  /* =========================================================
     BOOTSTRAP
  ========================================================== */
  window.closeReceiptModal = function(){ STATE.modal=null; render(); };

  var app = document.getElementById('app');
  app.addEventListener('click', function(e){ handleClick(e).catch(function(err){ console.error(err); }); });
  app.addEventListener('submit', function(e){ handleSubmit(e).catch(function(err){ console.error(err); }); });
  app.addEventListener('change', function(e){ handleChange(e).catch(function(err){ console.error(err); }); });
  app.addEventListener('input', handleInput);

  app.addEventListener('dragover', function(e){
    var zone = e.target.closest && e.target.closest('.dropzone');
    if(!zone) return;
    e.preventDefault();
    zone.classList.add('dragover');
  });
  app.addEventListener('dragleave', function(e){
    var zone = e.target.closest && e.target.closest('.dropzone');
    if(!zone) return;
    zone.classList.remove('dragover');
  });
  app.addEventListener('drop', function(e){
    var zone = e.target.closest && e.target.closest('.dropzone');
    if(!zone) return;
    e.preventDefault();
    zone.classList.remove('dragover');
    var input = zone.querySelector('input[type=file]');
    var files = e.dataTransfer && e.dataTransfer.files;
    if(input && files && files.length){
      input.files = files;
      input.dispatchEvent(new Event('change', {bubbles:true}));
    }
  });

  window.addEventListener('dragover', function(e){ e.preventDefault(); });
  window.addEventListener('drop', function(e){ e.preventDefault(); });

  init();
})();
