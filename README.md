# Eindopdracht Smart App Development:
password-generator

## Inhoudstabel
| Header | Beschrijving |
| ----------- | ----------- |
| [Algemeen](#algemeen) | korte uitleg van wat de app is |
| [Waarom](#waarom-kies-ik-voor-dit-onderwerp) | waarom ik voor dit onderwerp koos |
| [Technische uitwerking](#hoe-ga-ik-het-technisch-ongeveer-uitwerken)| hoe ik het technisch ga uitwerken|
| [UI](#wat-word-mijn-insteek-voor-de-ui)| mijn insteek voor UI|
| [Platformen](#op-welke-platformen-ga-ik-mij-focussen)| op welke platform(en) de focus zal liggen|


## Algemeen
De gebruiker kan kiezen uit de volgende dingen:
- lengte
- uppercase
- lowercase
- symbolen
- cijfers

De gebruiker kan het dan kopiëren en opslaan in clipboard.<br>
Via dit: [react-native-clipboard](https://github.com/react-native-clipboard/clipboard)

Samen met een password strength-meter.<br>
Via dit: [react-native-password-strength-meter](https://www.npmjs.com/package/react-native-password-strength-meter)

Om de app te kunnen gebruiken, moet de gebruiker een QR-code scannen met het wachtwoord om in te kunnen loggen.
Via dit: [Barcodescanner](https://docs.expo.dev/versions/v48.0.0/sdk/bar-code-scanner/)

Daarnaast kan de gebruiker zijn bestaande wachtwoorden ingeven om te kijken of het sterk genoeg is.
<br><br>
## Waarom kies ik voor dit onderwerp?
Het lijkt me leuk om te doen en wachtwoorden zijn vaak niet sterk genoeg, ook al ziet het wachtwoord er moeilijk uit.<br>
___wachtwoord moeilijk te onthouden != sterk wachtwoord___
<br><br>
## Hoe ga ik het technisch (ongeveer) uitwerken?
Op de homepage zal de generator staan.
Er wordt aangeduid welke eigenschappen het wachtwoord
moet hebben en na het drukken van een knop, wordt
het wachtwoord gegenereerd. Daarnaast wordt er een knop
voorzien om het woord te kopiëren. Net onder het woord zal
er een password-strength-meter staan.

Om te kijken of je bestaande wachtwoorden sterk genoeg zijn,
kan de gebruiker op een icon klikken om naar een andere pagina
te kunnen navigeren. Op die pagina zal er een inputveld staan en een knop
om de sterkte ervan te laten testen.
<br><br>
## Wat word mijn insteek voor de UI?
Om te kunnen navigeren naar de andere pagina, wil ik een icon
gebruiken [speed-icon](https://fonts.google.com/icons?icon.query=speed+&icon.platform=web)
Hier zal ik gebruik maken van een stack navigator.

Om visueel aan te duiden hoe sterk je wachtwoord is, wil ik een balkje
laten inkleuren afhankelijk van de sterkte van het wachtwoord.
<br><br>
## Op welke platformen ga ik mij focussen?
Op Android.
