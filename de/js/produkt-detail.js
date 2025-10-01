document.addEventListener('DOMContentLoaded', async function() {
    // AOS initialisieren
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // Produktdatenbank (später durch API ersetzen)
    const productDatabase = {
        '10w60-sport-tec': {
            name: '10W60 Sport Tec',
            artNr: 'ST-10W60',
            category: 'Motoröl',
            viscosity: '10W-60',
            description: 'Vollsynthetik-Motorenöl für stark beanspruchte Benzin- und Diesel-PKW-Motoren. Ideal für leistungsgesteigerte Motoren im Motorsport.',
            specifications: ['API SN/CF', 'ACEA A3/B4', 'BMW M SERIES', 'Vollsynthetik', 'Motorsport', 'Turbo geeignet'],
            applications: [
                'Hochleistungsmotoren',
                'Motorsport-Fahrzeuge',
                'Turbo- und Kompressor-Motoren',
                'Ältere BMW M-Modelle'
            ],
            benefits: [
                'Hervorragender Verschleißschutz bei extremen Bedingungen',
                'Stabile Viskosität auch bei höchsten Temperaturen',
                'Optimaler Schutz für leistungsgesteigerte Motoren',
                'Reduzierte Ölverdampfung'
            ],
            packaging: [],
            datasheet: 'datasheets/10w60-sport-tec.pdf',
            image: '../bilder/motoroel.png',
            relatedProducts: ['5w40-k2-hightec-hc-synthetic', '5w30-longlife-3', '0w30-zero-tec-vw']
        },
        '5w30-longlife-3': {
            name: '5W30 LongLife 3',
            artNr: 'LL3-5W30',
            category: 'Motoröl',
            viscosity: '5W-30',
            description: 'Premium Longlife-Motoröl für moderne Benzin- und Dieselmotoren mit Wartungsintervallen bis zu 30.000 km.',
            specifications: ['ACEA C3', 'API SN', 'VW 504.00/507.00', 'MB 229.51', 'BMW Longlife-04', 'Porsche C30'],
            applications: [
                'VW, Audi, Seat, Skoda mit Longlife-Service',
                'BMW mit Longlife-04 Freigabe',
                'Mercedes-Benz BlueTEC',
                'Moderne Dieselmotoren mit DPF'
            ],
            benefits: [
                'Verlängerte Ölwechselintervalle bis 30.000 km',
                'Kraftstoffersparnis durch Leichtlaufeigenschaften',
                'Schutz für Dieselpartikelfilter (Low SAPS)',
                'Ganzjahresöl für alle Temperaturen'
            ],
            packaging: [],
            datasheet: 'datasheets/5w30-longlife-3.pdf',
            image: '../bilder/motoroel.png',
            relatedProducts: ['5w30-classic-longlife-3', '5w30-premium-longlife', '5w30-mega-tec-ll']
        },
        '5w20-ford-eco': {
            name: '5W20 Ford Eco',
            artNr: 'FE-5W20',
            category: 'Motoröl',
            viscosity: '5W-20',
            description: 'Weiterentwickeltes, extrem kraftstoffsparendes HC-Synthese Hochleistungsmotorenöl für Ford EcoBoost-Motoren.',
            specifications: ['API SL/CF', 'ACEA C5 (A1/B1)', 'Ford WSS-M2C948-A/B', 'ILSAC GF-5', 'EcoBoost', 'HC-Synthese'],
            applications: [
                'Ford EcoBoost Benzinmotoren',
                'Moderne Ford-Fahrzeuge mit Kraftstoffsparvorgabe',
                'Jaguar und Land Rover Fahrzeuge mit 5W-20 Freigabe',
                'Fahrzeuge mit Start-Stop-Systemen'
            ],
            benefits: [
                'Extremer Verschleißschutz',
                'Exzellentes Viskositäts-Temperatur-Verhalten',
                'Schnelle Durchölung kritischer Schmierstellen',
                'Erhebliche Verschleißreduzierung an Zylinder und Nockenwelle',
                'Hohe Oxydations- und Temperaturstabilität',
                'Geringer Verdampfungsverlust',
                'Sehr hohe Reinigungswirkung'
            ],
            packaging: [],
            datasheet: 'datasheets/5w20-ford-eco.pdf',
            image: '../bilder/motoroel.png',
            relatedProducts: ['5w30-k1-ford', '5w30-cipe-c2', '0w20-vw-tec-blue-oil']
        },
        '5w30-classic-longlife-3': {
            name: '5W30 Classic LongLife 3',
            artNr: 'CLL3-5W30',
            category: 'Motoröl',
            viscosity: '5W-30',
            description: 'Zuverlässiges Leichtlaufmotorenöl für Fahrzeuge mit Longlife-Service. Entwickelt für täglichen Einsatz mit stabiler Schmierleistung.',
            specifications: ['ACEA C3', 'API SN', 'VW 504.00/507.00', 'MB 229.51', 'BMW LL04', 'Classic'],
            applications: [
                'VW, Audi, Seat, Skoda mit Longlife-Service',
                'Ältere BMW-Modelle mit LL-04 Freigabe',
                'Mercedes-Benz Diesel- und Benzinmotoren',
                'Fahrzeuge mit Dieselpartikelfilter'
            ],
            benefits: [
                'Zuverlässiger Motorschutz im täglichen Einsatz',
                'Gute Kaltstarteigenschaften',
                'Ölwechselintervalle bis zu 30.000 km',
                'Bewährte Qualität für Langzeitnutzung'
            ],
            packaging: [],
            datasheet: 'datasheets/5w30-classic-longlife-3.pdf',
            image: '../bilder/motoroel.png',
            relatedProducts: ['5w30-longlife-3', '5w30-premium-longlife', '5w30-mega-tec-ll']
        },
        '10w40-mm8-semi-synthetic': {
            name: '10W40 MM8 Semi Synthetic',
            artNr: 'MM8-10W40-SS',
            category: 'Motoröl',
            viscosity: '10W-40',
            description: 'Hochlegiertes Universal-Teilsynthetik-Leichtlauf-Motorenöl für PKW-Benzin- und Dieselmotoren. Ermöglicht energiesparenden Betrieb.',
            specifications: ['API SL/CF/EC', 'ACEA A3/B4', 'VW 505.00', 'MB 229.1', 'PSA B71 2296', 'Teilsynthetik'],
            applications: [
                'Ältere Benzin- und Dieselmotoren',
                'PKW und leichte Transporter',
                'Mercedes-Benz Fahrzeuge mit konventionellen Ölwechselintervallen',
                'Renault und PSA Motoren mit entsprechender Freigabe'
            ],
            benefits: [
                'Hervorragendes Preis-Leistungs-Verhältnis',
                'Guter Verschleißschutz',
                'Optimale Schmiereigenschaften auch bei höheren Temperaturen',
                'Ausgezeichnete Motorensauberkeit'
            ],
            packaging: [],
            datasheet: 'datasheets/10w40-mm8-semi-synthetic.pdf',
            image: '../bilder/motoroel.png',
            relatedProducts: ['10w40-high-tec-quantum']
        },
        '5w40-k2-hightec-hc-synthetic': {
            name: '5W40 K2 Hightec HC Synthetic',
            artNr: 'K2-5W40-HT',
            category: 'Motoröl',
            viscosity: '5W-40',
            description: 'Leichtlauf-Motorenöl für PKW-Otto- und Dieselmotoren auf Basis modernster HC-Synthesetechnologie. Turbo geeignet und Katalysator tauglich.',
            specifications: ['API SN/CF', 'ACEA A3/B4', 'BMW LL-01', 'MB 229.1/229.3/229.5', 'VW 501.01/502.00', 'HC-Synthese'],
            applications: [
                'Hochleistungs-Benzin- und Dieselmotoren',
                'Moderne Fahrzeuge mit Turbo- oder Kompressoraufladung',
                'BMW, Mercedes und VW/Audi mit entsprechenden Freigaben',
                'Ganzjahreseinsatz in gemäßigten Klimazonen'
            ],
            benefits: [
                'Hochwertige HC-Synthesetechnologie für optimalen Schutz',
                'Exzellente Schmierfähigkeit bei allen Betriebszuständen',
                'Reduzierter Ölverbrauch',
                'Verlängerte Motorlebensdauer durch verbesserten Verschleißschutz'
            ],
            packaging: [],
            datasheet: 'datasheets/5w40-k2-hightec-hc-synthetic.pdf',
            image: '../bilder/motoroel.png',
            relatedProducts: ['5w30-longlife-3', '5w40-high-tec-quantum', '0w30-zero-tec-vw']
        },
        '5w30-premium-longlife': {
            name: '5W30 Premium LongLife 3',
            artNr: 'PL-5W30-LL3',
            category: 'Motoröl',
            viscosity: '5W-30',
            description: 'Modernes Leichtlaufmotorenöl mit hochentwickeltem Leistungsverhalten. Exzellenter Verschleißschutz und überdurchschnittliche Reinigungskraft für Diesel- und Benzinmotoren.',
            specifications: ['API SP', 'ACEA C3', 'VW 504.00/507.00', 'BMW Longlife 04', 'MB 229.51/52'],
            applications: [
                'Neueste Generation von VW/Audi Diesel- und Benzinmotoren',
                'BMW-Modelle mit Longlife-Service',
                'Mercedes-Benz Fahrzeuge mit Bluetec-Technologie',
                'Fahrzeuge mit Dieselpartikelfilter und Katalysatoren'
            ],
            benefits: [
                'Überlegene Motorreinheit und Verschleißschutz',
                'Maximierte Ölwechselintervalle bis zu 30.000 km',
                'Ausgezeichnete Kaltstarteigenschaften',
                'Optimale Performance bei allen Betriebsbedingungen'
            ],
            packaging: [],
            datasheet: 'datasheets/5w30-premium-longlife.pdf',
            image: '../bilder/motoroel.png',
            relatedProducts: ['5w30-longlife-3', '5w30-classic-longlife-3', '5w30-extra-ll3']
        },
        '5w30-extra-ll3': {
            name: '5W30 Extra LongLife 3',
            artNr: 'EX-5W30-LL3',
            category: 'Motoröl',
            viscosity: '5W-30',
            description: 'Kraftstoffeinsparendes Super-Hightech-Motorenöl für moderne Benzin- und Dieselmotoren mit Ölwechselintervallen bis zu 30.000 km. Geeignet für Rußpartikelfilter.',
            specifications: ['API SN', 'ACEA C3', 'VW 504.00/507.00', 'BMW LL-04', 'MB 229.51/52'],
            applications: [
                'Hochleistungsfahrzeuge mit neuester Motorentechnologie',
                'Direkteinspritzer und Common-Rail Dieselmotoren',
                'Fahrzeuge mit Wartungsintervallen bis zu 30.000 km',
                'VW/Audi, BMW und Mercedes mit entsprechenden Freigaben'
            ],
            benefits: [
                'Herausragende Motorensauberkeit durch Premium-Additive',
                'Signifikante Kraftstoffersparnis',
                'Optimaler Schutz für Abgasnachbehandlungssysteme',
                'Exzellente Kaltstarteigenschaften bei extremen Temperaturen'
            ],
            packaging: [],
            datasheet: 'datasheets/5w30-extra-ll3.pdf',
            image: '../bilder/motoroel.png',
            relatedProducts: ['5w30-longlife-3', '5w30-premium-longlife', '0w30-zero-tec-vw']
        },
        '5w30-mega-tec-ll': {
            name: '5W30 Mega Tec LongLife 3',
            artNr: 'MT-5W30-LL',
            category: 'Motoröl',
            viscosity: '5W-30',
            description: 'Einsatzbewährter Schutz gegen Verschleiß, Ablagerungen und Verschlammung. Entwickelt für optimierte Verbrauchsökonomie und Turbolader-Schutz.',
            specifications: ['API SN/CF', 'ACEA C2/C3', 'BMW LL-04', 'MB 229.52/51/31', 'VW 505.xx'],
            applications: [
                'Hochwertige PKW-Motoren mit Abgasnachbehandlung',
                'Fahrzeuge mit Turboladern und Direkteinspritzung',
                'Benzin- und Dieselmotoren mit Partikelfilter',
                'Mitteleuropäisches Klima und Wartungsintervalle bis zu 30.000 km'
            ],
            benefits: [
                'Bewährte Schutzformel für alle Motorbedingungen',
                'Verbesserte Kraftstoffeffizienz',
                'Geeignet für Fahrzeuge mit Ölwechselintervallen bis zu 30.000 km',
                'Optimaler Turboladerschutz durch thermische Stabilität'
            ],
            packaging: [],
            datasheet: 'datasheets/5w30-mega-tec-ll.pdf',
            image: '../bilder/motoroel.png',
            relatedProducts: ['5w30-longlife-3', '5w30-c4-ren-tec', '5w30-premium-longlife']
        },
        '5w40-high-tec-quantum': {
            name: '5W40 High Tec Quantum',
            artNr: 'HTQ-5W40-C3',
            category: 'Motoröl',
            viscosity: '5W-40',
            description: 'Low Saps Leichtlauföl speziell für VW/Audi Pumpe-Düse-Motoren. HC-Synthesetechnologie für universellen Einsatz und optimale Katalysator-/Partikelfilter-Funktion.',
            specifications: ['API SP', 'ACEA C3', 'BMW LL-04', 'MB 229.52/51/31', 'VW 502.00/505.xx', 'Low SAPS'],
            applications: [
                'VW/Audi Pumpe-Düse-Motoren',
                'Moderne Dieselmotoren mit Partikelfilter',
                'Hochleistungs-Benzinmotoren mit Turboaufladung',
                'Fahrzeuge mit Wartungsintervallen bis zu 30.000 km'
            ],
            benefits: [
                'Speziell entwickelt für Pumpe-Düse-Technologie',
                'Verlängerte Lebensdauer von Partikelfiltern und Katalysatoren',
                'Ausgezeichnete Motorensauberkeit',
                'Hohe thermische und oxidative Stabilität'
            ],
            packaging: [],
            datasheet: 'datasheets/5w40-high-tec-quantum.pdf',
            image: '../bilder/motoroel.png',
            relatedProducts: ['5w30-longlife-3', '5w40-k2-hightec-hc-synthetic', '10w40-high-tec-quantum']
        },
        '10w40-high-tec-quantum': {
            name: '10W40 High Tec Quantum',
            artNr: 'HTQ-10W40',
            category: 'Motoröl',
            viscosity: '10W-40',
            description: 'Ganzjahres-Mehrbereichsöl mit sehr guten Laufeigenschaften. Ausgewogene Kombination für optimalen Ölverbrauch, Scherstabilität und niedrige Reibungsverluste.',
            specifications: ['API SL/CF/CG-4', 'ACEA A3/B4/E3', 'MB 228.1/229.1', 'VW 505.00/500.00', 'Volvo VDS'],
            applications: [
                'Ältere Benzin- und Dieselmotoren',
                'Nutzfahrzeuge und PKW mit höherer Laufleistung',
                'Motoren ohne DPF oder moderne Abgasnachbehandlung',
                'Mehrmotorfahrzeuge mit unterschiedlichen Ölanforderungen'
            ],
            benefits: [
                'Universell einsetzbar für gemischte Fuhrparks',
                'Guter Verschleißschutz bei höheren Laufleistungen',
                'Zuverlässige Leistung bei allen Betriebstemperaturen',
                'Wirtschaftliche Lösung für ältere Motoren'
            ],
            packaging: [],
            datasheet: 'datasheets/10w40-high-tec-quantum.pdf',
            image: '../bilder/motoroel.png',
            relatedProducts: ['10w40-mm8-semi-synthetic', '5w40-high-tec-quantum']
        },
        '0w30-profi-tec': {
            name: '0W30 Profi Tec für Euro 6',
            artNr: 'PT-0W30',
            category: 'Motoröl',
            viscosity: '0W-30',
            description: 'Vollsynthese-Motoröl für Otto- und Dieselmotoren mit Abgasnachbehandlung (DPF). Verbesserter Verschleißschutz, Kraftstoffeinsparung und niedriger Ölverbrauch.',
            specifications: ['API SP', 'ACEA C2', 'BMW LL-12FE', 'MB 229.61', 'PSA B71 2312', 'Vollsynthese'],
            applications: [
                'Neueste Generation von PKW-Motoren mit Euro 6 Standard',
                'PSA/Peugeot/Citroen-Motoren mit B71-2312 Anforderung',
                'BMW-Fahrzeuge der neuesten Generation',
                'Fahrzeuge mit Start-Stop-Technik und Hybridantrieb'
            ],
            benefits: [
                'Hervorragender Verschleißschutz',
                'Ausgezeichnete Oxydations- und Temperaturstabilität',
                'Minimale Reibungsverluste',
                'Optimale Motorsauberkeit durch intensive Reinigungswirkung',
                'Lange Ölwechselintervalle',
                'Hohe Kraftstoffersparnis'
            ],
            packaging: [],
            datasheet: 'datasheets/0w30-profi-tec.pdf',
            image: '../bilder/motoroel.png',
            relatedProducts: ['0w30-zero-tec-vw', '0w20-vw-tec-blue-oil', '5w30-cipe-c2']
        },
        '0w20-vw-tec-blue-oil': {
            name: '0W20 VW Tec Blue Oil',
            artNr: 'VW-0W20-BLUE',
            category: 'Motoröl',
            viscosity: '0W-20',
            description: 'Speziell für modernste VW-Gruppe Fahrzeuge. Vollsynthese-Öl für höchste Kraftstoffeinsparung bei Ölwechselintervallen bis zu 30.000 km. Nicht rückwärtskompatibel!',
            specifications: ['API SP', 'ACEA C5/C6', 'VW 508.00/509.00', 'BMW LL17FE+', 'MB 229.72/71', 'Vollsynthese'],
            applications: [
                'Neueste Generation der VW-Gruppe Motoren ab 2018',
                'Aktuelle BMW Motoren mit spezieller 0W-20 Freigabe',
                'Mercedes-Benz Fahrzeuge mit entsprechender Freigabe',
                'Hochmoderne Motoren mit maximalen Effizienzanforderungen'
            ],
            benefits: [
                'Maximale Kraftstoffeinsparung und CO2-Reduzierung',
                'Verlängerte Lebensdauer aller Abgaskomponenten',
                'Hervorragender Schutz vor Low-Speed Pre-Ignition (LSPI)',
                'Ölwechselintervalle bis zu 30.000 km'
            ],
            packaging: [],
            datasheet: 'datasheets/0w20-vw-tec-blue-oil.pdf',
            image: '../bilder/motoroel.png',
            relatedProducts: ['0w30-profi-tec', '5w20-ford-eco', '0w30-zero-tec-vw']
        },
        '5w30-k1-ford': {
            name: '5W30 K1 Ford',
            artNr: 'K1-5W30-FORD',
            category: 'Motoröl',
            viscosity: '5W-30',
            description: 'Weiterentwickeltes Leichtlauf-PKW-SAPS-Motorenöl auf HC-Synthese-Basis. Ausgezeichnete Motorsauberkeit und Katalysatorschutz mit ausgewählten Additiven.',
            specifications: ['API SL/CF', 'ACEA A1/B1/A5/B5', 'Ford WSS-M2C 913', 'Jaguar/Land Rover', 'HC-Synthese'],
            applications: [
                'Ford-Motoren mit WSS-M2C 913-Spezifikation',
                'Jaguar und Land Rover Fahrzeuge',
                'Motoren mit Katalysator und niedrigerem SAPS-Bedarf',
                'Fahrzeuge mit verbesserter Kraftstoffökonomie'
            ],
            benefits: [
                'Speziell für Ford-Motoren entwickelt',
                'Verbesserte Motorsauberkeit',
                'Guter Verschleißschutz bei erhöhten Temperaturen',
                'Optimale Kraftstoffeffizienz'
            ],
            packaging: [],
            datasheet: 'datasheets/5w30-k1-ford.pdf',
            image: '../bilder/motoroel.png',
            relatedProducts: ['5w20-ford-eco', '5w30-cipe-c2', '5w30-longlife-3']
        },
        '5w30-cipe-c2': {
            name: '5W30 Cipe C2',
            artNr: 'CIPE-5W30-C2',
            category: 'Motoröl',
            viscosity: '5W-30',
            description: 'HC-Synthese Leichtlauf-Motorenöl der letzten Generation. Außergewöhnliche Eigenschaften für heutige Anforderungen, optimal für Ölwechselintervalle bis zu 30.000 km.',
            specifications: ['API SN/CF/EC', 'ACEA C2/A5/B5', 'PSA B71 2290', 'ILSAC-GF5', 'Honda/Toyota/Mazda', 'HC-Synthese'],
            applications: [
                'Japanische und koreanische Fahrzeuge',
                'PSA-Gruppe (Peugeot, Citroen) Dieselmotoren',
                'Moderne Benzinmotoren mit Katalysator',
                'Fahrzeuge mit empfohlener ACEA C2 Spezifikation'
            ],
            benefits: [
                'Optimiert für asiatische Fahrzeugmodelle',
                'Hervorragende Motorsauberkeit',
                'Verlängerte Lebensdauer der Abgassysteme',
                'Optimale Kraftstoffeffizienz'
            ],
            packaging: [],
            datasheet: 'datasheets/5w30-cipe-c2.pdf',
            image: '../bilder/motoroel.png',
            relatedProducts: ['5w30-k1-ford', '0w30-profi-tec', '5w30-c4-ren-tec']
        },
        '5w30-c4-ren-tec': {
            name: '5W30 C4 Ren Tec',
            artNr: 'RT-5W30-C4',
            category: 'Motoröl',
            viscosity: '5W-30',
            description: 'Neu entwickeltes universelles Leichtlauf-Motorenöl auf HC-Synthese-Basis. Low SAPS Hochleistungs-Motorenöl mit außergewöhnlichen Fahrbetrieb-Eigenschaften.',
            specifications: ['ACEA C3/C4', 'MB 226.51/229.51/31', 'RN 0720 mit DPF', 'Low SAPS', 'HC-Synthese'],
            applications: [
                'Renault und Dacia Dieselmotoren mit DPF',
                'Mercedes-Benz Fahrzeuge mit Bluetec-Technologie',
                'Moderne Motoren mit Niedrigascheöl-Anforderung',
                'Fahrzeuge mit Abgasnachbehandlungssystemen'
            ],
            benefits: [
                'Speziell entwickelt für Renault-Motoren mit DPF',
                'Maximaler Schutz aller Abgasnachbehandlungssysteme',
                'Verlängerte Lebensdauer von Partikelfiltern',
                'Optimale Motorensauberkeit und Verschleißschutz'
            ],
            packaging: [],
            datasheet: 'datasheets/5w30-c4-ren-tec.pdf',
            image: '../bilder/motoroel.png',
            relatedProducts: ['5w30-cipe-c2', '5w30-mega-tec-ll', '5w30-longlife-3']
        },
        '0w30-zero-tec-vw': {
            name: '0W30 Zero Tec VW',
            artNr: 'ZT-0W30-VW',
            category: 'Motoröl',
            viscosity: '0W-30',
            description: 'Neu entwickeltes universelles Leichtlauf-Motorenöl auf HC-Synthese-Basis. Hochwirksame Additive für hervorragende Fahrbetrieb-Eigenschaften.',
            specifications: ['API SN', 'ACEA C3', 'VW 504.00/507.00', 'BMW LL-04', 'MB 229.52/51/31', 'HC-Synthese'],
            applications: [
                'Moderne VW-Gruppe Fahrzeuge mit Longlife-Service',
                'BMW und Mercedes mit entsprechenden Freigaben',
                'Fahrzeuge mit Partikelfilter und Katalysator',
                'Betrieb in extremen klimatischen Bedingungen'
            ],
            benefits: [
                'Hervorragender Verschleißschutz',
                'Reduziert den Kraftstoffverbrauch im Teil- und Volllastbetrieb und reduziert die Abgasemission',
                'Verringerte Aschebildung (Low SAPS)',
                'Leichter Motorlauf',
                'Optimale Motorsauberkeit',
                'Sehr geringer Widerstand beim Start des Motors',
                'Sehr hohe Betriebssicherheit',
                'Hohe Leistungsreserven',
                'Lange Ölwechselintervalle',
                'Ganzjahreseinsatz'
            ],
            packaging: [],
            datasheet: 'datasheets/0w30-zero-tec-vw.pdf',
            image: '../bilder/motoroel.png',
            relatedProducts: ['5w30-longlife-3', '0w30-profi-tec', '0w20-vw-tec-blue-oil']
        },
        '5w30-low-saps-euro6': {
            name: '5W30 Low Saps bis Euro 6',
            artNr: 'LS-5W30-E6',
            category: 'LKW-Motoröl',
            viscosity: '5W-30',
            description: 'Optimale Oxidations- und Alterungsstabilität für maximale Kraftstoffersparnis. Hoher Schutz gegen Verschleiß, Ablagerungen und verlängerte Wechselintervalle.',
            specifications: ['ACEA E7/E8/E11', 'API CK-4', 'MAN 3677', 'MB 228.51', 'Volvo VDS-4.5', 'Euro 6'],
            applications: [
                'Euro 6 und Euro 5 Nutzfahrzeugmotoren',
                'LKW- und Busmotoren mit SCR-Katalysator und DPF',
                'Motoren mit höchsten Anforderungen an Kraftstoffeffizienz',
                'Fahrzeuge mit verlängerten Ölwechselintervallen'
            ],
            benefits: [
                'Signifikante Kraftstoffeinsparung durch synthetische Basis',
                'Maximaler Schutz moderner Abgasnachbehandlungssysteme',
                'Hervorragender Verschleißschutz auch bei Volllast',
                'Ölwechselintervalle bis zu 30.000 km gemäß Herstellervorgaben'
            ],
            packaging: [],
            datasheet: 'datasheets/5w30-low-saps-euro6.pdf',
            image: '../bilder/lkw-motoroel.png',
            relatedProducts: ['10w40-low-saps-euro6', '15w40-heavy-duty']
        },
        '10w40-low-saps-euro6': {
            name: '10W40 Low Saps bis Euro 6',
            artNr: 'MT-10W40-E6',
            category: 'LKW-Motoröl',
            viscosity: '10W-40',
            description: 'HC-Synthese Hochleistungsmotorenöl für Euro 5/6 Nutzfahrzeuge. Entwickelt für Abgasnachbehandlungssysteme und Partikelfilter mit komplexen tribologischen Anforderungen.',
            specifications: ['API CI-4', 'ACEA E6/E7/E9', 'MB 228.51/226.9', 'MAN 3477/3271-1', 'Volvo VDS-4.5', 'Euro 6'],
            applications: [
                'Euro 6 und Euro 5 Nutzfahrzeugmotoren',
                'LKW und Busse mit Dieselpartikelfilter (DPF)',
                'Motoren mit SCR-Katalysatoren',
                'Mercedes, MAN, Volvo und DAF Nutzfahrzeuge'
            ],
            benefits: [
                'Verlängerte Lebensdauer der Abgasnachbehandlungssysteme',
                'Ausgezeichneter Verschleißschutz auch bei Volllastbetrieb',
                'Hervorragende Motorsauberkeit und Kolbenreinheit',
                'Optimierter Verbrauch bei schweren Betriebsbedingungen'
            ],
            packaging: [],
            datasheet: 'datasheets/10w40-low-saps-euro6.pdf',
            image: '../bilder/lkw-motoroel.png',
            relatedProducts: ['5w30-low-saps-euro6', '15w40-heavy-duty']
        },
        '20w50-truckmaster-pro': {
            name: '20W50 Truckmaster Pro',
            artNr: 'TMP-20W50',
            category: 'LKW-Motoröl',
            viscosity: '20W-50',
            description: 'Sehr gute Oxidations- und Alterungsstabilität für hohen Verschleißschutz. Ideal für Kurzstreckenverkehr und extreme Belastungen, verhindert Verschlammung.',
            specifications: ['API SL/CF/CI-4', 'ACEA A3/B4/E7', 'MB 228.3', 'MAN M 3275', 'Volvo VDS-3'],
            applications: [
                'Ältere Nutzfahrzeugmotoren mit höherer Laufleistung',
                'Schwerlastbetrieb unter extremen Temperaturbedingungen',
                'Fahrzeuge im Einsatz in heißen Klimazonen',
                'Gemischte Flotten mit verschiedenen Motortypen'
            ],
            benefits: [
                'Sehr hoher Verschleißschutz bei älteren Motoren',
                'Reduzierter Ölverbrauch durch optimierte Viskosität',
                'Hervorragende Motorsauberkeit auch bei langen Intervallen',
                'Hohe Scherstabilität auch unter extremen Bedingungen'
            ],
            packaging: [],
            datasheet: 'datasheets/20w50-truckmaster-pro.pdf',
            image: '../bilder/lkw-motoroel.png',
            relatedProducts: ['15w40-heavy-duty', '10w40-low-saps-euro6']
        },
        'atf-dexron-vi': {
            name: 'ATF Dexron VI',
            artNr: 'ATF-DXVI',
            category: 'Getriebeöl',
            viscosity: 'ATF',
            description: 'Premium-Automatikgetriebeflüssigkeit für moderne Automatikgetriebe. Optimale Reibcharakteristik für sanfte Schaltvorgänge und maximalen Verschleißschutz.',
            specifications: ['Dexron VI', 'MB 236.15', 'BMW ATF', 'Honda DW1', 'Toyota WS', 'Hyundai SP-IV'],
            applications: [
                'Moderne Automatikgetriebe in PKW und leichten Nutzfahrzeugen',
                'Mercedes 7G-Tronic und 9G-Tronic Getriebe',
                'BMW Steptronic Getriebe',
                'Japanische und koreanische Fahrzeuge mit ATF-Anforderung'
            ],
            benefits: [
                'Perfekt abgestimmte Reibcharakteristik für sanfte Schaltvorgänge',
                'Ausgezeichneter Verschleißschutz für längste Getriebestandzeiten',
                'Optimale Kälteeigenschaften für schnelles Ansprechverhalten',
                'Verbesserte Kraftstoffeffizienz durch reduzierte Reibung'
            ],
            packaging: [],
            datasheet: 'datasheets/atf-dexron-vi.pdf',
            image: '../bilder/getriebeoel.png',
            relatedProducts: ['dsg-fluid', 'cvt-fluid', '75w90-gl5']
        },
        'scheibenfrost-60': {
            name: 'Scheibenfrostschutz -60°C',
            artNr: 'SF-60C',
            category: 'Frostschutz',
            viscosity: 'Vollkonzentrat',
            description: 'Hochwirksamer Frostschutz für Scheibenwaschanlage mit Citrus-Duft. Konzentrat mit Reinigungsformel für streifenfreie Sicht und Frostschutz bis -60°C.',
            specifications: ['Citrus-Duft', '-60 Grad', 'Fächerdüsen', 'Vollkonzentrat', 'Polycarbonat-geeignet', 'Scheibenwaschanlage'],
            applications: [
                'Scheibenwaschanlage für PKW, LKW und Busse',
                'Winterbetrieb in extremen Klimazonen',
                'Fächerdüsen und moderne Scheibenwaschanlagen',
                'Ganzjahreseinsatz in verdünnter Form'
            ],
            benefits: [
                'Extremer Frostschutz bis -60°C (unverdünnt)',
                'Streifenfreie Reinigung ohne Schlierenbildung',
                'Schonend für Lackflächen und Gummidichtungen',
                'Angenehmer Citrus-Duft im Fahrzeuginnenraum'
            ],
            packaging: [],
            datasheet: 'datasheets/scheibenfrost-60.pdf',
            image: '../bilder/Frostschutz.png',
            relatedProducts: ['e12-plus-pink-violett-37-ready-mix', 'e12-plus-pink-violett-vollkonzentrat', 'nf-40-blau-vollkonzentrat']
        },
        'hydraulik-hlp-46': {
            name: 'Hydrauliköl HLP 46',
            artNr: 'HLP-46',
            category: 'Hydrauliköl',
            viscosity: 'ISO VG 46',
            description: 'Mineralölbasisches Hydrauliköl für industrielle und mobile Hydrauliksysteme unter normalen Betriebsbedingungen. Enthält wirksame Additive gegen Korrosion und Verschleiß.',
            specifications: ['DIN 51524 Teil 2', 'ISO VG 46', 'Vickers M2950', 'Denison HF', 'Bosch Rexroth'],
            applications: [
                'Stationäre Industriehydraulik',
                'Mobile Hydrauliksysteme in Baumaschinen',
                'Hydraulische Systeme mit normalen Betriebstemperaturen',
                'Anwendungen ohne extreme Temperaturwechsel'
            ],
            benefits: [
                'Zuverlässiger Verschleißschutz für Pumpen und Komponenten',
                'Guter Korrosionsschutz für alle Metallteile',
                'Ausgezeichnetes Luftabscheidevermögen',
                'Gute Alterungsbeständigkeit für längere Standzeiten'
            ],
            packaging: [],
            datasheet: 'datasheets/hydraulik-hlp-46.pdf',
            image: '../bilder/hydraulikoel.png',
            relatedProducts: ['hydraulik-hlp-22', 'hydraulik-hlp-68', 'hydraulik-hlp-32']
        },

        'hydraulik-hlp-68': {
            name: 'Hydrauliköl HLP 68',
            artNr: 'HLP-68',
            category: 'Hydrauliköl',
            viscosity: 'ISO VG 68',
            description: 'Leistungsstarkes Hydrauliköl für Anwendungen mit höherer Betriebstemperatur. Optimaler Verschleißschutz und verbesserte Alterungsstabilität für anspruchsvolle Anwendungen.',
            specifications: ['DIN 51524 Teil 2', 'ISO VG 68', 'Vickers M2950', 'Denison HF', 'CETOP RP 91'],
            applications: [
                'Schwere Industriehydraulik',
                'Hydrauliksysteme mit höheren Betriebstemperaturen',
                'Stationäre Anlagen mit erhöhter Belastung',
                'Werkzeugmaschinen und Pressen'
            ],
            benefits: [
                'Hervorragender Verschleißschutz bei hohen Temperaturen',
                'Ausgezeichnete Alterungsbeständigkeit',
                'Optimale Schmierfähigkeit unter Belastung',
                'Zuverlässiger Betrieb auch bei anspruchsvollen Bedingungen'
            ],
            packaging: [],
            datasheet: 'datasheets/hydraulik-hlp-68.pdf',
            image: '../bilder/hydraulikoel.png',
            relatedProducts: ['hydraulik-hlp-46', 'hydraulik-hlp-22', 'hydraulik-hlp-100']
        },

        'dsg-fluid': {
            name: 'DSG Getriebeöl',
            artNr: 'DSG-FLUID',
            category: 'Getriebeöl',
            viscosity: 'DSG',
            description: 'Spezialflüssigkeit für Direktschaltgetriebe (DSG) mit Doppelkupplung. Optimale Reibcharakteristik für schnelle, ruckfreie Schaltvorgänge und maximalen Verschleißschutz.',
            specifications: ['VW G052 182', 'DSG-Getriebe', 'Doppelkupplung', 'Synthetisch', 'Spezialöl'],
            applications: [
                'VW/Audi DSG-Getriebe mit 6 oder 7 Gängen',
                'Direktschaltgetriebe mit Doppelkupplungstechnologie',
                'Seat, Škoda und andere Fahrzeuge mit DSG',
                'Sportwagen und Fahrzeuge mit schnellen Schaltvorgängen'
            ],
            benefits: [
                'Optimierte Reibcharakteristik für perfekte Schaltqualität',
                'Maximaler Verschleißschutz für längere Getriebestandzeit',
                'Hervorragende Kälteeigenschaften für schnelles Ansprechverhalten',
                'Verbesserte Kraftübertragung für höhere Effizienz'
            ],
            packaging: [],
            datasheet: 'datasheets/dsg-fluid.pdf',
            image: '../bilder/getriebeoel.png',
            relatedProducts: ['atf-dexron-vi', 'cvt-fluid', '75w90-gl5']
        },
        'cvt-fluid': {
            name: 'CVT Getriebeflüssigkeit',
            artNr: 'CVT-SPEC',
            category: 'Getriebeöl',
            viscosity: 'CVT',
            description: 'Hochleistungsflüssigkeit für stufenlose CVT-Getriebe mit Schubgliederband. Spezielle Reibcharakteristik für optimale Kraftübertragung ohne Schlupf.',
            specifications: ['MB CVT', 'Audi Multitronic', 'Honda/Toyota/Mazda', 'Stufenlos-Getriebe', 'Synthetisch'],
            applications: [
                'Stufenlose Automatikgetriebe (CVT)',
                'Multitronic-Getriebe von Audi',
                'Asiatische Fahrzeuge mit CVT-Technologie',
                'Moderne CVT-Getriebe mit Metallschubgliederkette'
            ],
            benefits: [
                'Optimale Kraftübertragung ohne Schlupf',
                'Maximaler Verschleißschutz für CVT-Komponenten',
                'Hervorragende Alterungsstabilität',
                'Verbesserte Kraftstoffeffizienz durch optimierte Reibung'
            ],
            packaging: [],
            datasheet: 'datasheets/cvt-fluid.pdf',
            image: '../bilder/getriebeoel.png',
            relatedProducts: ['atf-dexron-vi', 'dsg-fluid', '75w90-gl5']
        },
        '75w90-gl5': {
            name: 'Getriebeöl 75W-90 GL5',
            artNr: '75W90-GL5',
            category: 'Getriebeöl',
            viscosity: '75W-90',
            description: 'Vollsynthetisches Hochleistungs-Getriebeöl für höchstbelastete Achsgetriebe und Differentiale. Hervorragender Schutz auch unter extremen Bedingungen.',
            specifications: ['API GL-5', 'MIL-L-2105D', 'Scania STO 1:0', 'Vollsynthetik', 'ZF TE-ML 05A/07A/12A'],
            applications: [
                'Hochbelastete Achsgetriebe und Differentiale',
                'Hypoidverzahnte Achsantriebe',
                'Schwerlastfahrzeuge und Baumaschinen',
                'Fahrzeuge mit verlängerten Ölwechselintervallen'
            ],
            benefits: [
                'Hervorragender Schutz bei extremer Belastung',
                'Ausgezeichnete Kälteeigenschaften für schnelle Schmierung',
                'Verbesserte Kraftstoffeffizienz durch reduzierte Reibung',
                'Verlängerte Ölwechselintervalle möglich'
            ],
            packaging: [],
            datasheet: 'datasheets/75w90-gl5.pdf',
            image: '../bilder/getriebeoel.png',
            relatedProducts: ['atf-dexron-vi', '80w90-gl5', '75w80-gl4']
        },
        '80w90-gl5': {
            name: 'Getriebeöl 80W-90 GL5',
            artNr: '80W90-GL5',
            category: 'Getriebeöl',
            viscosity: '80W-90',
            description: 'Mineralisches Hochleistungs-Getriebeöl für Schalt- und Achsgetriebe. Zuverlässiger Schutz für klassische Getriebe und Differentiale.',
            specifications: ['API GL-5', 'MIL-L-2105D', 'ZF TE-ML 05A/07A/16B/17B', 'Scania STO 1:0'],
            applications: [
                'Schaltgetriebe in PKW und Nutzfahrzeugen',
                'Achsgetriebe und Differentiale',
                'Klassische Fahrzeuge und ältere Modelle',
                'Landmaschinen und Baufahrzeuge'
            ],
            benefits: [
                'Zuverlässiger Schutz für klassische Getriebe',
                'Gute Verschleißschutz-Eigenschaften',
                'Stabile Schmierfilmbildung unter Belastung',
                'Wirtschaftliche Lösung für Standard-Anwendungen'
            ],
            packaging: [],
            datasheet: 'datasheets/80w90-gl5.pdf',
            image: '../bilder/getriebeoel.png',
            relatedProducts: ['75w90-gl5', '75w80-gl4', 'atf-dexron-vi']
        },
        '75w80-gl4': {
            name: 'Getriebeöl 75W-80 GL4',
            artNr: '75W80-GL4',
            category: 'Getriebeöl',
            viscosity: '75W-80',
            description: 'Leichtlauf-Getriebeöl für moderne Schaltgetriebe mit Synchronringen. Ermöglicht leichte, präzise Schaltvorgänge und verbessert den Kaltstart.',
            specifications: ['API GL-4', 'MIL-L-2105', 'ZF TE-ML 02L/08/11', 'BMW MTF', 'Honda MTF'],
            applications: [
                'Moderne Schaltgetriebe mit Synchronisierung',
                'Leichtgängige PKW-Schaltgetriebe',
                'Getriebe mit Kupfer- oder Messingkomponenten',
                'Fahrzeuge mit Leichtlaufanforderungen'
            ],
            benefits: [
                'Leichte und präzise Schaltvorgänge',
                'Exzellente Kältefließeigenschaften',
                'Schonend für Synchronringe aus Buntmetall',
                'Reduzierter Kraftstoffverbrauch durch Leichtlaufeigenschaften'
            ],
            packaging: [],
            datasheet: 'datasheets/75w80-gl4.pdf',
            image: '../bilder/getriebeoel.png',
            relatedProducts: ['75w90-gl5', '80w90-gl5', 'atf-dexron-vi']
        },
        '15w40-heavy-duty': {
            name: '15W40 Heavy Duty',
            artNr: 'TD-15W40',
            category: 'LKW-Motoröl',
            viscosity: '15W-40',
            description: 'Robustes Hochleistungs-Dieselmotorenöl für LKW, Busse und Baumaschinen. Zuverlässiger Schutz für Motoren in anspruchsvollem Alltags- und Schwerlastbetrieb.',
            specifications: ['API CI-4/SL SHPD', 'ACEA E7', 'MB 228.3', 'MAN M 3275', 'Volvo VDS-3', 'Euro 2-5'],
            applications: [
                'Schwere Nutzfahrzeuge und LKW',
                'Baumaschinen und stationäre Dieselmotoren',
                'Lieferfahrzeuge und Omnibusse',
                'Gemischte Fuhrparks mit älteren Dieselmotoren'
            ],
            benefits: [
                'Hervorragender Verschleißschutz für lange Motorlebensdauer',
                'Zuverlässige Schmierung auch bei hoher Belastung',
                'Gute Kaltstarteigenschaften',
                'Wirtschaftliche Lösung für gemischte Flotten'
            ],
            packaging: [],
            datasheet: 'datasheets/15w40-heavy-duty.pdf',
            image: '../bilder/lkw-motoroel.png',
            relatedProducts: ['10w40-low-saps-euro6', '5w30-low-saps-euro6']
        },
        
        'hydraulik-hlp-32': {
            name: 'Hydrauliköl HLP 32',
            artNr: 'HLP-32',
            category: 'Hydrauliköl',
            viscosity: 'ISO VG 32',
            description: 'Hochwertiges mineralisches Hydrauliköl für industrielle und mobile Hydrauliksysteme mit normaler Betriebstemperatur. Ideal für Präzisionsanwendungen.',
            specifications: ['DIN 51524-2', 'ISO VG 32', 'Vickers I-286-S', 'Denison HF', 'AFNOR NF'],
            applications: [
                'Hydrauliksysteme mit niedrigerer Viskositätsanforderung',
                'Präzisionshydraulik und Servohydraulik',
                'Industrieanlagen in klimatisierten Räumen',
                'Innenraumhydraulik mit konstanten Temperaturen'
            ],
            benefits: [
                'Optimale Fließeigenschaften für Präzisionssteuerungen',
                'Guter Verschleißschutz für empfindliche Komponenten',
                'Ausgezeichnetes Luftabscheidevermögen',
                'Zuverlässiger Betrieb auch bei häufigen Start-Stopp-Zyklen'
            ],
            packaging: [],
            datasheet: 'datasheets/hydraulik-hlp-32.pdf',
            image: '../bilder/hydraulikoel.png',
            relatedProducts: ['hydraulik-hlp-46', 'hydraulik-hlp-22', 'hydraulik-hlp-100']
        },
        'hydraulik-hlp-100': {
            name: 'Hydrauliköl HLP 100',
            artNr: 'HLP-100',
            category: 'Hydrauliköl',
            viscosity: 'ISO VG 100',
            description: 'Schweres Hydrauliköl für hochbelastete Systeme und erhöhte Betriebstemperaturen. Optimaler Schutz für langsam laufende, stark belastete Hydraulikkomponenten.',
            specifications: ['DIN 51524-2', 'ISO VG 100', 'AIST 126/127', 'ISO 11158', 'Vickers M2950'],
            applications: [
                'Hydrauliksysteme mit hohen Betriebstemperaturen',
                'Schwere Pressen und Formmaschinen',
                'Stationäre Industriehydraulik unter Hochlast',
                'Systeme mit hohen Drücken und langsamen Bewegungen'
            ],
            benefits: [
                'Hervorragender Verschleißschutz bei hoher Belastung',
                'Stabile Schmierfilmbildung auch bei hohen Temperaturen',
                'Ausgezeichnete Oxidationsstabilität für lange Standzeiten',
                'Gute Wasserabscheidung für Betriebssicherheit'
            ],
            packaging: [],
            datasheet: 'datasheets/hydraulik-hlp-100.pdf',
            image: '../bilder/hydraulikoel.png',
            relatedProducts: ['hydraulik-hlp-68', 'hydraulik-hlp-46', 'hydraulik-hlp-32']
        },
        'dot4-lv-es6': {
            name: 'Dot 4 LV ES.6 Class 6',
            artNr: 'DOT4-LV-ES6',
            category: 'Bremsflüssigkeit',
            viscosity: 'DOT 4 LV',
            description: 'Hochwertige synthetische Bremsflüssigkeit auf Glykolether-Basis für Kfz-Brems- und Kupplungssysteme. Besonders empfohlen für ESP/DCS, ASR und ABS.',
            specifications: ['DOT 4 LV', 'FMVSS No 116', 'SAE J1704', 'ISO 4925 Class 6', 'ESP/ABS geeignet', 'Synthetisch'],
            applications: [
                'Moderne Fahrzeuge mit ESP-/DSC-Systemen',
                'Fahrzeuge mit ABS und ASR',
                'Scheiben- und Trommelbremsen',
                'Kupplungsbetätigung mit hydraulischem System'
            ],
            benefits: [
                'Niedrige Viskosität für schnelleres Ansprechen der ESP/ABS-Systeme',
                'Hervorragende Kälteeigenschaften',
                'Verlängerte Wechselintervalle durch hohe Temperaturstabilität',
                'Hoher Siedepunkt für zusätzliche Sicherheit'
            ],
            packaging: [],
            datasheet: 'datasheets/dot4-lv-es6.pdf',
            image: '../bilder/elat-fass.png',
            relatedProducts: ['bremsflussigkeit-dot4']
        },
        'bremsflussigkeit-dot4': {
            name: 'Bremsflüssigkeit DOT 4 LV',
            artNr: 'BF-DOT4-LV',
            category: 'Bremsflüssigkeit',
            viscosity: 'DOT 4 LV',
            description: 'Dot 4 Bremsflüssigkeit ist eine Hochleistungsbremsflüssigkeit, die für die Anforderungen moderner Kfz‑Bremssysteme mit Scheiben- oder Trommelbremsen konzipiert ist.',
            specifications: ['DOT 4 LV', 'FMVSS 116', 'SAE J1704', 'ISO 4925 Class 4', 'Siedepunkt >260 Grad'],
            applications: [
                'Moderne Fahrzeuge mit ABS, ESP und ASR',
                'Scheiben- und Trommelbremsen',
                'Kupplungsbetätigung mit hydraulischem System',
                'Fahrzeuge mit elektronischen Stabilitätssystemen'
            ],
            benefits: [
                'Hervorragende Kälteeigenschaften für schnelles Ansprechen',
                'Hoher Siedepunkt für Sicherheit bei Hitzebelastung',
                'Optimale Viskosität für moderne elektronische Bremssysteme',
                'Verbesserte Korrosionsschutzeigenschaften'
            ],
            packaging: [],
            datasheet: 'datasheets/bremsflussigkeit-dot4.pdf',
            image: '../bilder/Frostschutz.png',
            relatedProducts: ['dot4-lv-es6']
        },

        
        // Zusätzliche Produkte aus der Produktliste (Platzhalter, bis detaillierte Daten vorliegen)
        'hydraulik-hlp-22': {
            name: 'Hydrauliköl HLP 22',
            artNr: 'HLP-22',
            category: 'Hydrauliköl',
            viscosity: 'ISO VG 22',
            description: 'Hochwertiges Hydrauliköl der HLP-Klasse für Anwendungen mit niedrigerer Viskositätsanforderung. Details folgen – bitte kontaktieren Sie uns für Spezifikationen und Freigaben.',
            specifications: ['DIN 51524-2', 'ISO VG 22'],
            applications: ['Präzisionshydraulik', 'Innenraumhydraulik', 'Industrieanlagen'],
            benefits: ['Zuverlässiger Verschleißschutz', 'Gutes Luftabscheidevermögen'],
            packaging: [],
            datasheet: '',
            image: '../bilder/hydraulikoel.png',
            relatedProducts: ['hydraulik-hlp-32', 'hydraulik-hlp-46']
        },
        'e12-plus-pink-violett-37-ready-mix': {
            name: 'E12+ Pink/Violett -37 Ready Mix',
            artNr: 'E12-37-RM',
            category: 'Frostschutz',
            viscosity: 'Ready Mix',
            description: 'Gebrauchsfertige Dauerkühlflüssigkeit auf Basis von Ethylenglykol für Sommer- und Winterbetrieb (Ganzjahreseinsatz) mit Frost- und Korrosionsschutz; Frostschutz bis -37°C. Weiterentwickeltes Kühlerschutz- und Wärmeübertragungsmittel mit hochwertigen Korrosionsinhibitoren; entspricht den aktuellen Anforderungen moderner Motoren. Nitrit-, amin-, phosphat- und silikatfrei.',
            specifications: ['Ready Mix', 'Pink/Violett'],
            applications: [
                'Für Motoren aus Gusseisen, Aluminium oder Mischbauweise',
                'Kühlsysteme aus Aluminium- und Kupferlegierungen',
                'Empfohlen für Leichtmetallmotoren mit hohem Aluminiumschutzbedarf bei hohen Temperaturen',
                'Kühlmittelwechsel je nach Typ/Hersteller nach 3–6 Jahren empfohlen'
            ],
            benefits: [
                'Längerer und hervorragender Korrosionsschutz',
                'Verbesserte Wärmeübertragung',
                'Verringerte Regreßansprüche bezüglich Reparaturen am Kühlsystem',
                'Geeignet für gemischte Fuhrparks: ein einzelnes Produkt für PKW, LKW und Baumaschinen',
                'Umweltschonend durch längere Lebensdauer',
                'Schaumverhinderung',
                'Verträglichkeit mit Schlauch- und Dichtungsmaterialien',
                'Verträglichkeit mit Lacken'
            ],
            packaging: [],
            datasheet: '',
            image: '../bilder/Frostschutz.png',
            relatedProducts: ['e12-plus-pink-violett-vollkonzentrat', 'nf-40-blau-vollkonzentrat']
        },
        'e12-plus-pink-violett-vollkonzentrat': {
            name: 'E12+ Pink/Violett Vollkonzentrat',
            artNr: 'E12-VK',
            category: 'Frostschutz',
            viscosity: 'Vollkonzentrat',
            description: 'Vollkonzentriertes Kühlerschutz- und Wärmeübertragungsmittel auf Basis von 1,2‑Ethandiol (Monoethylenglykol) für Sommer- und Winterbetrieb (Ganzjahreseinsatz) mit Frost- und Korrosionsschutz. Weiterentwickelte Formulierung mit hochwertigen Korrosionsinhibitoren; entspricht den aktuellen Anforderungen moderner Motoren. Nitrit-, amin-, phosphat- und silikatfrei.',
            specifications: ['Vollkonzentrat', 'Pink/Violett'],
            applications: [
                'Für Motoren aus Gusseisen, Aluminium oder Mischbauweise',
                'Kühlsysteme aus Aluminium- und Kupferlegierungen',
                'Empfohlen für Leichtmetallmotoren mit hohem Aluminiumschutzbedarf bei hohen Temperaturen',
                'Einsatzkonzentration: 50% (Frostschutz bis -37°C), max. 69% (bis -68°C)',
                'Einsatzdauer: NFZ bis 500.000 km (~8.000 h), PKW bis 250.000 km (~2.000 h), stationär bis 32.000 h/5 Jahre; Wechsel spätestens alle 5 Jahre'
            ],
            benefits: [
                'Längerer und hervorragender Korrosionsschutz',
                'Verbesserte Wärmeübertragung',
                'Verringerte Regreßansprüche bezüglich Reparaturen am Kühlsystem',
                'Umweltschonend durch längere Lebensdauer',
                'Schaumverhinderung'
            ],
            packaging: [],
            datasheet: '',
            image: '../bilder/Frostschutz.png',
            relatedProducts: ['e12-plus-pink-violett-37-ready-mix', 'nf-40-blau-vollkonzentrat']
        },
        'nf-40-blau-vollkonzentrat': {
            name: 'NF 40 Blau Vollkonzentrat',
            artNr: 'NF40-BLAU',
            category: 'Frostschutz',
            viscosity: 'Vollkonzentrat',
            description: 'Vollkonzentriertes Kühlerschutzmittel auf Basis von Monoethylenglykol für Sommer- und Winterbetrieb (Ganzjahreseinsatz) mit Frost- und Korrosionsschutz. Hochleistungs‑Korrosions‑/Frostschutz für Motor und Kühlsystem, entsprechend modernen Anforderungen im Motorenbau. Nitrit-, amin- und phosphatfrei.',
            specifications: ['Vollkonzentrat', 'Blau'],
            applications: [
                'Geeignet für Alu-, Leichtmetall- und Graugußmotoren (Herstellerangaben beachten)',
                'Einsatzkonzentration: 50% (Frostschutz ca. -38°C)',
                'Max. 68% Konzentrat/32% Wasser: Frostschutz bis -69°C',
                'Kühlmittelwechsel je nach Hersteller alle 2–3 Jahre'
            ],
            benefits: [
                'Schutz vor Korrosion für alle Bauteile des Kühlsystems, die aus den Materialien Stahl, Grauguß, Aluminium, Kupfer, Messing, Weichlot bestehen.',
                'Vermeidung von Kavitationsschäden, z.B. an der Kühlstoffpumpe',
                'Verträglichkeit mit Lacken',
                'Verträglichkeit mit Schlauch- und Dichtungsmaterialien',
                'Vermeidung von Ablagerungen, die zu Kühlerverstopfungen führen können',
                'Schaumverhinderung'
            ],
            packaging: [],
            datasheet: '',
            image: '../bilder/Frostschutz.png',
            relatedProducts: ['e12-plus-pink-violett-vollkonzentrat', 'e12-plus-pink-violett-37-ready-mix']
        },
        'atf-17-lv': {
            name: 'ATF 17 LV Spezial HighTec',
            artNr: 'ATF-17-LV',
            category: 'Getriebeöl',
            viscosity: 'ATF LV',
            description: 'Niedrigviskoses ATF für moderne Automatikgetriebe. Details folgen – bitte kontaktieren Sie uns für Spezifikationen.',
            specifications: ['ATF LV'],
            applications: ['Moderne Automatikgetriebe'],
            benefits: ['Sanfte Schaltvorgänge', 'Verschleißschutz'],
            packaging: [],
            datasheet: '',
            image: '../bilder/getriebeoel.png',
            relatedProducts: ['atf-dexron-vi', 'dsg-fluid']
        },
        'atf-15-mb-tec': {
            name: 'ATF 15 LV Tec',
            artNr: 'ATF-15-LV',
            category: 'Getriebeöl',
            viscosity: 'ATF LV',
            description: 'Leichtlauf-ATF für ausgewählte MB-Automatiken. Details folgen – bitte kontaktieren Sie uns für Spezifikationen.',
            specifications: ['ATF LV'],
            applications: ['Automatikgetriebe'],
            benefits: ['Optimierte Reibcharakteristik'],
            packaging: [],
            datasheet: '',
            image: '../bilder/getriebeoel.png',
            relatedProducts: ['atf-dexron-vi', 'cvt-fluid']
        }
    };

    // Alias-Mapping: alternative Slugs -> kanonische IDs in der Datenbank
    const aliasMap = {
        // Schreibvarianten / Tippfehler-Korrekturen
        '5w30-megatec-ll': '5w30-mega-tec-ll',
        '10w40-megatron-low-saps-euro6': '10w40-low-saps-euro6',
    '15w40-truck-diesel': '15w40-heavy-duty',
        'dot-4-bremsflüssigkeit': 'bremsflussigkeit-dot4',
        'dot-4-bremsflussigkeit': 'bremsflussigkeit-dot4',
        // Nutzer-URL mit ue statt ü
        'dot-4-bremsfluessigkeit': 'bremsflussigkeit-dot4',
        'bremsfluessigkeit-dot4': 'bremsflussigkeit-dot4',
        'bremsflüssigkeit-dot4': 'bremsflussigkeit-dot4',
        'bremsflussigkeit-dot-4': 'bremsflussigkeit-dot4',
        'dot-4-lv-es-6-class-6': 'dot4-lv-es6',

        // Getriebeöle Markenbezeichnungen -> bestehende IDs
        '75w80-megran': '75w80-gl4',
        '75w90-staron-gl5': '75w90-gl5',
        '80w90-ventron': '80w90-gl5',
        'high-tec-atf-vi-dexron-vi': 'atf-dexron-vi',
        'cvt-high-tec': 'cvt-fluid',
        'dsg-tec-high-tec-atf-dcg': 'dsg-fluid',

        // Hydraulik Öl-Schreibweisen aus Produktliste -> bestehende IDs
        'hlp-100-high-tec-hydraulikoel': 'hydraulik-hlp-100',
        'hlp-68-high-tec-hydraulikoel': 'hydraulik-hlp-68',
        'hlp-46-high-tec-hydraulikoel': 'hydraulik-hlp-46',
        'hlp-32-high-tec-hydraulikoel': 'hydraulik-hlp-32',
        'hlp-22-high-tec-hydraulikoel': 'hydraulik-hlp-22',

        // Frostschutz Varianten -> ggf. neue Einträge unten
        'scheibenfrostschutz-60-grad': 'scheibenfrost-60',
        'e12-plus-pink-violett-37-ready-mix': 'e12-plus-pink-violett-37-ready-mix',
        'e12-plus-pink-violett-vollkonzentrat': 'e12-plus-pink-violett-vollkonzentrat',
        'nf-40-blau-vollkonzentrat': 'nf-40-blau-vollkonzentrat',

        // ATF Varianten
        'atf-17-lv': 'atf-17-lv',
        'atf-15-mb-tec': 'atf-15-mb-tec'
    };

    // URL-Parameter auslesen
    const urlParams = new URLSearchParams(window.location.search);
    const rawId = urlParams.get('id');
    const resolvedId = rawId && aliasMap[rawId] ? aliasMap[rawId] : rawId;

    if (!resolvedId || !productDatabase[resolvedId]) {
        showError();
        return;
    }

    // Optional: Zentrale Zuordnung aus JSON laden und Datasheet überschreiben
    try {
        const resp = await fetch('data/datasheets.json', { cache: 'no-store' });
        if (resp.ok) {
            const map = await resp.json();
            const p = productDatabase[resolvedId];
            if (map && typeof map === 'object' && Object.prototype.hasOwnProperty.call(map, resolvedId)) {
                const sheet = map[resolvedId];
                if (typeof sheet === 'string' && sheet.trim()) {
                    p.datasheet = sheet.trim();
                }
            }
        }
    } catch (e) {
        // still proceed with local product datasheet
        console.warn('Datasheet-Mapping konnte nicht geladen werden:', e);
    }

    // Produkt anzeigen
    displayProduct(productDatabase[resolvedId]);

    // Nach dem Rendern prüfen, ob das verlinkte Datenblatt existiert.
    // Falls nicht erreichbar, Button durch neutralen Hinweis ersetzen (keine 404-Klicks).
    try {
        const p = productDatabase[resolvedId];
        if (p && p.datasheet && typeof p.datasheet === 'string' && p.datasheet.trim()) {
            const sheetUrl = p.datasheet.trim();
            let ok = false;
            try {
                const headResp = await fetch(sheetUrl, { method: 'HEAD', cache: 'no-store' });
                ok = headResp.ok;
            } catch (_) {
                ok = false;
            }
            if (!ok) {
                try {
                    const getResp = await fetch(sheetUrl, { method: 'GET', cache: 'no-store' });
                    ok = getResp.ok;
                } catch (_) {
                    ok = false;
                }
            }
            if (!ok) {
                const link = document.querySelector(`a[href="${sheetUrl}"]`);
                if (link && link.parentElement) {
                    const placeholder = document.createElement('span');
                    placeholder.className = 'bg-gray-200 text-gray-500 px-6 py-3 rounded-lg text-center font-medium cursor-not-allowed';
                    placeholder.innerHTML = '<i class="fas fa-file-pdf mr-2"></i>Datenblatt folgt';
                    link.replaceWith(placeholder);
                }
            }
        }
    } catch (e) {
        console.warn('Datenblatt-Verfügbarkeitsprüfung fehlgeschlagen:', e);
    }

    function displayProduct(product) {
        const contentDiv = document.getElementById('product-content');
        const breadcrumb = document.getElementById('breadcrumb-product');
        
        // Seitentitel aktualisieren
        document.title = `${product.name} | Elat Handels GmbH`;
        breadcrumb.textContent = product.name;

        // HTML für Produktdetails generieren
        contentDiv.innerHTML = `
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Linke Spalte: Produktbild und Grundinfos -->
                <div>
                    <div class="bg-gray-100 rounded-lg p-8 mb-6 flex items-center justify-center h-64 overflow-hidden">
                        <img src="../bilder/elat-fass.png" alt="${product.name}" class="max-h-full max-w-full object-contain">
                    </div>
                    
                    <div class="bg-blue-50 rounded-lg p-4 mb-4">
                        <h3 class="font-bold text-lg mb-2">Produktinformationen</h3>
                        <dl class="space-y-2">
                            <div class="flex justify-between">
                                <dt class="text-gray-600">Artikel-Nr:</dt>
                                <dd class="font-medium">${product.artNr}</dd>
                            </div>
                            <div class="flex justify-between">
                                <dt class="text-gray-600">Kategorie:</dt>
                                <dd class="font-medium">${product.category}</dd>
                            </div>
                            <div class="flex justify-between">
                                <dt class="text-gray-600">Viskosität:</dt>
                                <dd class="font-medium">${product.viscosity}</dd>
                            </div>
                        </dl>
                    </div>
                </div>

                <!-- Rechte Spalte: Detaillierte Infos -->
                <div>
                    <h1 class="text-3xl font-bold text-gray-900 mb-4">${product.name}</h1>
                    <p class="text-gray-700 mb-6">${product.description}</p>

                    <!-- Spezifikationen -->
                    <div class="mb-6">
                        <h3 class="font-bold text-lg mb-3">Spezifikationen & Freigaben</h3>
                        <div class="flex flex-wrap gap-2">
                            ${product.specifications.map(spec => 
                                `<span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">${spec}</span>`
                            ).join('')}
                        </div>
                    </div>

                    <!-- Anwendungsbereiche -->
                    <div class="mb-6">
                        <h3 class="font-bold text-lg mb-3">Anwendungsbereiche</h3>
                        <ul class="space-y-2">
                            ${product.applications.map(app => 
                                `<li class="flex items-start">
                                    <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
                                    <span class="text-gray-700">${app}</span>
                                </li>`
                            ).join('')}
                        </ul>
                    </div>

                    <!-- Vorteile -->
                    <div class="mb-6">
                        <h3 class="font-bold text-lg mb-3">Ihre Vorteile</h3>
                        <ul class="space-y-2">
                            ${product.benefits.map(benefit => 
                                `<li class="flex items-start">
                                    <i class="fas fa-star text-yellow-500 mt-1 mr-2"></i>
                                    <span class="text-gray-700">${benefit}</span>
                                </li>`
                            ).join('')}
                        </ul>
                    </div>

                    <!-- CTA Buttons -->
                    <div class="flex flex-col sm:flex-row gap-3 mt-8">
                        <a href="kontakt.html?produkt=${encodeURIComponent(product.name)}&artnr=${encodeURIComponent(product.artNr || '')}&viskositaet=${encodeURIComponent(product.viscosity || '')}#contactForm" 
                           class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition text-center font-medium">
                            <i class="fas fa-envelope mr-2"></i>Anfrage senden
                        </a>
                        ${product.datasheet ? `
                            <a href="${product.datasheet}" 
                               class="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition text-center font-medium"
                               target="_blank">
                                <i class="fas fa-file-pdf mr-2"></i>Datenblatt (PDF)
                            </a>
                        ` : ''}
                        <a href="produkte.html" 
                           class="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition text-center font-medium">
                            <i class="fas fa-arrow-left mr-2"></i>Zurück
                        </a>
                    </div>
                </div>
            </div>

            <!-- Ähnliche Produkte -->
            ${product.relatedProducts && product.relatedProducts.length > 0 ? `
                <div class="mt-12 pt-8 border-t">
                    <h2 class="text-2xl font-bold mb-6">Ähnliche Produkte</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        ${getRelatedProductsHTML(product.relatedProducts)}
                    </div>
                </div>
            ` : ''}
        `;
    }

    function getRelatedProductsHTML(relatedProductIds) {
        let html = '';
        
        // Get current product ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const currentProductId = urlParams.get('id');
        const currentProduct = productDatabase[currentProductId];
        
        // Filter related products for specific categories
        let filteredIds = relatedProductIds;
        if (currentProduct) {
            if (currentProduct.category === 'Frostschutz') {
                // Only show Frostschutz products in the related products
                filteredIds = Object.keys(productDatabase)
                    .filter(id => id !== currentProductId && productDatabase[id].category === 'Frostschutz')
                    .slice(0, 3); // Limit to 3 related products
            } else if (currentProduct.category === 'Hydrauliköl') {
                // Only show Hydrauliköl products in the related products
                filteredIds = Object.keys(productDatabase)
                    .filter(id => id !== currentProductId && productDatabase[id].category === 'Hydrauliköl')
                    .slice(0, 3); // Limit to 3 related products
            } else if (currentProduct.category === 'LKW-Motoröl') {
                // Only show LKW-Motoröl products in the related products
                filteredIds = Object.keys(productDatabase)
                    .filter(id => id !== currentProductId && productDatabase[id].category === 'LKW-Motoröl')
                    .slice(0, 3); // Limit to 3 related products
            } else if (currentProduct.category === 'Bremsflüssigkeit') {
                // Nur Bremsflüssigkeit-Produkte in den verwandten Produkten anzeigen
                filteredIds = Object.keys(productDatabase)
                    .filter(id => id !== currentProductId && productDatabase[id].category === 'Bremsflüssigkeit')
                    .slice(0, 3); // Auf 3 verwandte Produkte begrenzen

                // Fallback: Wenn keine passenden Bremsflüssigkeit-Produkte gefunden wurden, die originalen verwandten Produkte beibehalten
                if (filteredIds.length === 0) {
                    filteredIds = relatedProductIds;
                }
            } else if (currentProduct.category === 'Motoröl') {
                // Bei Motorölen auf Viskosität und Spezifikationen achten
                const currentViscosity = currentProduct.viscosity;
                const currentSpecs = currentProduct.specifications;
                
                // Viskositätsklasse extrahieren (z.B. "5W30" aus "5W-30")
                const currentViscClass = currentViscosity.replace('-', '');
                
                // Filtern nach ähnlichen Produkten basierend auf Spezifikationen und Viskosität
                filteredIds = Object.keys(productDatabase)
                    .filter(id => {
                        if (id === currentProductId) return false; // Aktuelles Produkt ausschließen
                        
                        const product = productDatabase[id];
                        if (product.category !== 'Motoröl') return false; // Nur Motoröle
                        
                        // Viskosität MUSS übereinstimmen
                        const productViscClass = product.viscosity.replace('-', '');
                        if (productViscClass !== currentViscClass) return false;
                        
                        // Prüfen auf gemeinsame Spezifikationen oder Anwendungsfälle
                        let hasCommonSpecs = false;
                        if (currentSpecs && product.specifications) {
                            // Hersteller und Standard-Spezifikationen prüfen
                            const currentSpecsSet = new Set();
                            const productSpecsSet = new Set();
                            
                            // Extrahiere Herstellerspezifikationen und Standards
                            for (const spec of currentSpecs) {
                                if (spec.includes('BMW') || spec.includes('MB') || 
                                    spec.includes('VW') || spec.includes('Porsche') || 
                                    spec.includes('Ford') || spec.includes('GM') ||
                                    spec.includes('ACEA') || spec.includes('API')) {
                                    // Nur Hauptbestandteil nehmen (z.B. "BMW" statt "BMW LL-04")
                                    const mainPart = spec.split(' ')[0];
                                    currentSpecsSet.add(mainPart);
                                    
                                    // Spezifische Standards für ACEA und API extra prüfen
                                    if (spec.startsWith('ACEA')) {
                                        // Klasse extrahieren (A/B, C, etc.)
                                        const aceaClass = spec.substring(5, 6);
                                        currentSpecsSet.add('ACEA-' + aceaClass);
                                    }
                                }
                            }
                            
                            // Das gleiche für das potenzielle verwandte Produkt
                            for (const spec of product.specifications) {
                                if (spec.includes('BMW') || spec.includes('MB') || 
                                    spec.includes('VW') || spec.includes('Porsche') || 
                                    spec.includes('Ford') || spec.includes('GM') ||
                                    spec.includes('ACEA') || spec.includes('API')) {
                                    const mainPart = spec.split(' ')[0];
                                    productSpecsSet.add(mainPart);
                                    
                                    if (spec.startsWith('ACEA')) {
                                        const aceaClass = spec.substring(5, 6);
                                        productSpecsSet.add('ACEA-' + aceaClass);
                                    }
                                }
                            }
                            
                            // Prüfe auf gemeinsame Spezifikationen
                            for (const spec of currentSpecsSet) {
                                if (productSpecsSet.has(spec)) {
                                    hasCommonSpecs = true;
                                    break;
                                }
                            }
                        }
                        
                        // Produkt MUSS gleiche Viskosität UND ähnliche Spezifikationen haben
                        return hasCommonSpecs;
                    })
                    .slice(0, 3); // Limit to 3 related products
                
                // Falls keine passenden Produkte mit ähnlichen Spezifikationen gefunden wurden,
                // zeige nur Produkte mit exakt gleicher Viskositätsklasse
                if (filteredIds.length === 0) {
                    filteredIds = Object.keys(productDatabase)
                        .filter(id => {
                            if (id === currentProductId) return false;
                            const product = productDatabase[id];
                            const productViscClass = product.viscosity.replace('-', '');
                            return product.category === 'Motoröl' && productViscClass === currentViscClass;
                        })
                        .slice(0, 3);
                }
                
                // Falls immer noch keine passenden Produkte, keine verwandten Produkte anzeigen
                if (filteredIds.length === 0) {
                    // Keine Fallback zu allgemeinen Motorölen mehr
                    filteredIds = [];
                }
            }
        }
        
        filteredIds.forEach(id => {
            if (productDatabase[id]) {
                const relatedProduct = productDatabase[id];
                html += `
                    <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                        <div class="flex items-center justify-center h-32 bg-gray-50 rounded mb-3">
                            <img src="../bilder/elat-fass.png" alt="${relatedProduct.name}" class="max-h-full max-w-full object-contain">
                        </div>
                        <h3 class="font-bold text-lg mb-1 text-blue-600">
                            <a href="produkt-detail.html?id=${id}">${relatedProduct.name}</a>
                        </h3>
                        <p class="text-sm text-gray-600 mb-2">${relatedProduct.viscosity} ${relatedProduct.category}</p>
                        <div class="flex flex-wrap gap-1 mb-3">
                            ${relatedProduct.specifications.slice(0, 3).map(spec => 
                                `<span class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">${spec}</span>`
                            ).join('')}
                        </div>
                        <a href="produkt-detail.html?id=${id}" class="text-sm text-blue-600 hover:text-blue-700 font-medium">
                            Details ansehen →
                        </a>
                    </div>
                `;
            }
        });
        
        return html;
    }

    function showError() {
        document.getElementById('product-content').style.display = 'none';
        document.getElementById('error-message').classList.remove('hidden');
    }
});
