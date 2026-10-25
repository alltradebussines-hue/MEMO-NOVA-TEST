# Memo Nova — prototipo Android gratuito installabile (PWA)

## Cosa include

- Registrazione dal microfono con `MediaRecorder` e salvataggio del file audio quando si salva la nota.
- Trascrizione italiana tramite Web Speech API, se disponibile nel browser. La registrazione audio resta disponibile anche senza trascrizione.
- Scomposizione delle frasi in attività, checklist touch, filtri, lettura delle attività aperte e agenda per oggi, domani, settimana e mese. Riconosce date e orari semplici come “domani chiama Giordano alle 9”, crea un impegno per domani alle 09:00 e mostra le attività ordinate nell’agenda.
- Dati salvati in `localStorage` e diario esportabile come `diario_idee.txt`.
- Assistente in primo piano chiamabile “Memo” o con un alias modificabile (predefinito “Marta”), con voce italiana disponibile sul dispositivo, velocità, tono e stile regolabili.
- Domande scritte o vocali semplici: lettura delle attività aperte e comando “fatta” per completare la prima attività aperta.
- Promemoria: primo richiamo alle 09:00 del giorno dopo la nota, poi ogni 2 ore nella prima giornata di richiami, ogni 4 ore nei giorni 2–3, ogni 8 ore nei giorni 4–7, ogni 24 ore fino al giorno 30. Dopo un mese, una volta la domenica sera. Gli intervalli valgono mentre la PWA è attiva; l'utente può rimandare una singola attività.
- Ogni attività può essere rimandata a domani, alla settimana successiva, tra un mese o a una data scelta. Può anche ricevere una scadenza e produrre un file `.ics` da importare nel calendario del telefono. Le attività aperte restano archiviate.
- Domande locali su attività aperte, oggi, domani, settimana, mese nominato o data (`gg/mm/aaaa`). Le attività senza scadenza sono indicate come tali; la data della nota non viene spacciata per una scadenza.
- Risposte di supporto usano ascolto non giudicante, domande aperte, riconoscimento degli sforzi e rispetto delle scelte, ispirati ai principi del colloquio motivazionale. Non è un modello AI né una psicologa, non fa diagnosi e non sostituisce un professionista. Riferimenti: [American Psychological Association, definizione di colloquio motivazionale](https://dictionary.apa.org/motivational-interviewing) e [American Academy of Pediatrics, comunicazione empatica e centrata sulla persona](https://www.aap.org/en/patient-care/healthy-active-living-for-families/communicating-with-families/motivational-interviewing/).
- È possibile acquisire una foto con la fotocamera del telefono o allegare un'immagine. Memo chiede cosa farne; dettando o scrivendo un promemoria, la foto rimane allegata alla nota.
- Installazione come PWA su Android e cache offline dell'interfaccia.

## Avvio e installazione su Android

La PWA richiede un'origine HTTPS (o `localhost`) per microfono e installazione. Pubblicare gratuitamente i file statici su un hosting HTTPS gratuito, per esempio GitHub Pages, Cloudflare Pages o Netlify, poi aprire il link con Chrome su Android e scegliere **⋮ → Aggiungi a schermata Home / Installa app**. Non sono necessari backend, account utente o API a pagamento. La pubblicazione su un servizio esterno richiede che il proprietario scelga e configuri il proprio account.

Per provare in locale, avviare un server statico nella cartella; l'app va aperta tramite `localhost`, non con `file://`.

## Limiti della prima fase

- Una PWA non può avviare un overlay sopra le altre app, intercettare volume/power a schermo bloccato o fornire un widget Android nativo. Per queste funzioni serve una successiva app nativa Android e il rispetto dei permessi/policy del sistema.
- Il riconoscimento vocale dipende dal browser/dispositivo; in alcuni casi il browser invia l'audio al proprio servizio di riconoscimento. Le note e le checklist di questa PWA restano nel browser sul dispositivo.
- L'audio usa il codec compresso supportato dal browser (di solito WebM/Opus o MP4/AAC), ma il file va scaricato/esportato: il browser non può scrivere in background in `/Documents/MieiVocali/` senza selezione/consenso dell'utente.
- L'esportazione scarica un diario completo. Per aggiungere al medesimo file esistente si può usare il selettore file supportato dal browser; se non disponibile, esportare e unire manualmente la copia precedente.
- L'assistente riconosce alcuni comandi vocali semplici, incluso “fatta” per la prima attività aperta, quando il browser espone il riconoscimento vocale. La lettura non segue ancora l'avanzamento una voce alla volta: la spunta touch resta disponibile.
- L'assistente vocale di questa versione funziona solo quando l'app è aperta. La scelta della voce mostra le voci italiane esposte dal dispositivo; il genere percepito e la naturalezza dipendono dalle voci installate e non possono essere garantiti dal browser.
- Le risposte sono regole locali, senza un modello AI: non leggono il calendario del telefono, meteo, posizione, mappe o traffico. Il file `.ics` va aperto/importato dall'utente nel calendario.
- I promemoria web sono controllati quando la PWA è aperta o torna in primo piano. Non c'è un server push che possa svegliare l'app chiusa; per notifiche affidabili a orari prefissati anche a app chiusa occorre una soluzione nativa o un servizio push.
- Le foto sono ridimensionate e conservate sul dispositivo insieme alla nota. L'esportazione `.txt` non contiene i file immagine.
- La foto non è ancora analizzata automaticamente per riconoscere un prodotto o cercarlo sul web: l'utente deve descrivere cosa vede e quale azione vuole ricordare.
- Il riconoscimento delle attività è euristico: le virgole possono dividere anche una frase che non è una lista; verificare le caselle create prima di affidarsi ai promemoria.

## Predisposizione iOS

È una PWA web standard, quindi la stessa interfaccia può essere provata in Safari su iPhone e aggiunta alla schermata Home, con supporto alle funzioni variabile. Per una versione nativa multipiattaforma futura, mantenere modello dati e API indipendenti dalla UI e sostituire l'accesso a microfono, filesystem, notifiche e scorciatoie con adattatori di piattaforma (per esempio Flutter o React Native). L'overlay, i tasti fisici e i widget vanno progettati separatamente per iOS secondo le API e le regole Apple.

## Tasti e ascolto in background su Android

Il doppio tocco del tasto di accensione è riservato al sistema/alle funzioni del dispositivo e una normale app non può assegnarselo a piacere. Questa PWA non può ascoltare a schermo bloccato. In un'app nativa Android, la registrazione può essere avviata in situazioni consentite dal sistema e deve essere visibile all'utente; le versioni Android recenti limitano l'avvio in background dei servizi che usano il microfono. Alternative rapide e più affidabili da implementare sono il widget Android, il collegamento/notifica persistente e un comando dalla schermata dell'app. L'attivazione sempre in ascolto richiede una valutazione tecnica, di batteria, privacy e distribuzione prima di essere promessa.

La PWA può chiedere alla fotocamera di scattare una foto quando l'utente tocca il campo foto. Per assegnare un tasto laterale alla cattura vocale non si può fare affidamento sul tasto di accensione: Android lo gestisce a livello di sistema. Una chiave fotocamera dedicata esiste solo su alcuni dispositivi; i tasti volume normalmente cambiano il volume e il loro inoltro alle app dipende dal contesto e dal dispositivo. Perciò la versione nativa deve prevedere un pulsante widget/notifica e usare solo scorciatoie hardware effettivamente disponibili sul telefono, senza promettere che il doppio tasto power possa essere rimappato.

### Accessi rapidi personalizzabili nella versione nativa Android

Prima installazione: una schermata “Accessi rapidi” permette di scegliere l'azione da associare a ogni scorciatoia disponibile: **Registra nota vocale**, **Apri fotocamera**, **Leggi attività aperte**. Fornire in ogni caso tre alternative affidabili e personalizzabili: scorciatoie separate sull'icona dell'app e sulla Home, riquadro nei Quick Settings e azioni nella notifica persistente. Android supporta scorciatoie fissabili sul Launcher e Quick Settings tiles aggiunte esplicitamente dall'utente (vedi [scorciatoie Android](https://developer.android.com/develop/ui/compose/system/shortcuts/creating-shortcuts) e [Quick Settings tiles](https://developer.android.com/develop/ui/views/quicksettings-tiles)).

Se il produttore espone un tasto laterale programmabile o un tasto fotocamera dedicato, l'app può proporre l'associazione solo dopo aver verificato quella possibilità sul modello concreto. Non promettere di rimappare Power/doppio Power o di intercettare Volume a schermo bloccato: sono controlli di sistema e il comportamento dipende dal produttore. Il comando “Registra nota” deve aprire subito la schermata di registrazione e mostrare chiaramente il microfono attivo; se il telefono è bloccato, può essere necessario sbloccarlo o autorizzare la registrazione persistente.

## Tutor e integrazioni da sviluppare

Il tutor richiesto è una guida personale generalista, cordiale, discreta, spiritosa quando è appropriato e capace di correggere con tatto imprecisioni o assunzioni sbagliate. Deve distinguere le funzioni verificate da quelle non disponibili e chiedere il contesto che manca.

Per renderlo utile senza fingere di essere onnisciente, separare le competenze in strumenti: calendario e promemoria; meteo; ricerca web e offerte; percorso, traffico e incidenti; pianificazione bagagli/attrezzatura; calcoli e scrittura. Ogni integrazione deve mostrare la fonte e l'ora dell'ultimo aggiornamento e segnalare quando il dato non è disponibile. Percorsi e distributori richiedono almeno destinazione, orario e tipo di veicolo/alimentazione; meteo richiede la località. Posizione, calendario e inventario di attrezzatura devono essere facoltativi e attivati solo con consenso esplicito. Nessun prezzo, incidente, previsione o “ricerca di mercato” va inventato.

Per le conversazioni di supporto, usare tecniche ispirate al colloquio motivazionale: domande aperte, ascolto riflessivo, rinforzo realistico degli sforzi, riepilogo e rispetto dell'autonomia. Questi sono principi di comunicazione, non una certificazione psicologica. L'assistente deve presentarsi come AI; non diagnostica, non prescrive e indirizza a professionisti per questioni cliniche o urgenti. Riferimenti professionali: [APA Dictionary of Psychology](https://dictionary.apa.org/motivational-interviewing), [American Academy of Pediatrics](https://www.aap.org/en/patient-care/healthy-active-living-for-families/communicating-with-families/motivational-interviewing/).

L'architettura per l'evoluzione: PWA/interfaccia separata da un nucleo di pianificazione e da moduli API sostituibili. I dati personali restano locali finché non si implementa e si autorizza la sincronizzazione. Il backend servirà solo dove necessario per funzioni condivise o integrazioni; nessuna chiave API privata va inserita nel codice frontend.


## Roadmap completa di Memo Nova

Questa sezione raccoglie le funzioni concordate per il progetto. Le voci “successive” sono requisiti approvati per lo sviluppo, non funzioni già disponibili nel prototipo PWA.

### Nucleo dell’assistente
- Cattura di idee in testo, voce e foto; salvataggio cronologico con checklist modificabile e completamento manuale o vocale.
- Conversione delle frasi in attività, riconoscimento di giorno, data e orario, agenda per oggi, domani, settimana e mese, ricerca degli impegni per domanda vocale o scritta.
- Promemoria delle attività lasciate aperte, risposta “fatta”, rimando a domani, settimana prossima, mese successivo o data scelta, con eventi esportabili al calendario.
- Progetti, hobby e missioni personali con obiettivi, prossimi passi e suggerimenti del tutor quando rimane tempo libero.
- Diario locale con esportazione, allegati audio e foto; autenticazione Google e sincronizzazione da progettare come opzione, senza inviare dati al cloud senza consenso.

### Tutor Nova
- Nome Memo e alias personalizzabile, voce disponibile sul dispositivo, velocità, tono e stile; guida animata con esempi brevi, scorciatoie e consigli sull’uso.
- Tono competente, cordiale, discreto e umano, con umorismo misurato e correzioni gentili. Le funzioni di supporto emotivo usano comunicazione non giudicante; Nova non è una psicologa o un medico e non fa diagnosi.
- Calcoli pratici, preventivi di spesa e totali da liste dettate, con distinzione chiara tra importi inseriti dall’utente e stime di mercato.
- Aiuto con foto di articoli, descrizione e ricerca di mercato; meteo, attrezzatura, preparazione bagagli, mappe, traffico, incidenti e distributori richiedono fonti aggiornate e consenso per posizione e dati del veicolo.

### Accesso rapido e piattaforme
- Priorità Android: pulsante grande, widget, scorciatoie dell’icona, riquadro Impostazioni rapide e azioni nella notifica. Sul HONOR Magic V3 si verifica l’eventuale Avvio rapido del tasto Volume giù; doppio tasto di accensione, tasti laterali a schermo bloccato e avvio del microfono in background dipendono dalle funzioni consentite da MagicOS e Android.
- Fotocamera da accesso rapido, poi domanda se allegare la foto a un promemoria o usarla per una ricerca.
- Versione iOS futura con interfaccia e modello dati condivisi, adattando separatamente microfono, fotocamera, notifiche, widget e scorciatoie alle regole Apple.
- Due spazi pubblicitari piccoli e discreti, disattivati nel prototipo; non devono interrompere audio, cattura, checklist o promemoria.

### Sviluppo previsto
1. Rendere affidabili cattura audio e trascrizione sul Magic V3, agenda e gestione locale dei dati.
2. Realizzare l’app Android nativa con accessi rapidi, widget, notifiche di sistema e salvataggio audio persistente.
3. Aggiungere account Google e sincronizzazione facoltativa dopo aver definito privacy, backup e recupero dei dati.
4. Integrare gradualmente calendario, meteo, ricerca, mappe, traffico e stime con fonti esplicite e costi controllati.
5. Preparare la versione iOS e valutare annunci solo dopo i test d’uso.
