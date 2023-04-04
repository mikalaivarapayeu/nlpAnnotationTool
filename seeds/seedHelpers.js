module.exports.corpus = {
    name: 'rUTIProbiotics',
    sentences: [
        {
            sentNumber: 1,
            labelName: 'studyDesign',
            isExtractable: true,
            isSelfContanined: true,
            words: [
                ['Subsequently', 'none'], [',', 'none'], ['we', 'none'], ['conducted', 'rborder'], ['a', 'none'], ['randomized', 'none'], [',', 'none'], ['double-blind', 'none'], [',', 'none'],
                ['placebo-controlled', 'none'], ['phase', 'none'], ['2', 'none'], ['trial', 'rbordervalue'],
                ['of', 'none'], ['Lactin-V', 'none'], ['among', 'none'], ['women', 'none'], ['with', 'none'], ['rUTI', 'none'], ['.', 'none']
            ],

        },
        {
            sentNumber: 2,
            labelName: 'subjectDescription',
            isExtractable: true,
            isSelfContanined: true,
            words: [
                ['We', 'none'], ['recruited', 'rborder'], ['premenopausal', 'none'], ['women', 'none'], ['aged', 'none'], ['18–40', 'none'],
                ['years', 'none'], ['with', 'none'], ['current', 'none'], [',', 'none'], ['symptomatic', 'none'], [',', 'none'], ['uncomplicated', 'none'],
                ['cystitis', 'none'], ['from', 'endphrase'], ['the', 'none'], ['student', 'none'],
                ['health', 'none'], ['center', 'none'], ['at', 'none'], ['the', 'none'], ['University', 'none'], ['of', 'none'],
                ['Washington', 'none'], ['(', 'none'], ['Seattle', 'none'], [',', 'none'], ['WA', 'none'], [')', 'none'], ['from', 'none'],
                ['February', 'none'], ['2006', 'none'], ['through', 'none'], ['February', 'none'], ['2009', 'none'], ['.', 'none']

            ]

        },
        {
            sentNumber: 2,
            labelName: 'recruitmentDetails',
            isExtractable: true,
            isSelfContanined: true,
            words: [
                ['We', 'none'], ['recruited', 'none'], ['premenopausal', 'none'], ['women', 'none'], ['aged', 'none'], ['18–40', 'none'],
                ['years', 'none'], ['with', 'none'], ['current', 'none'], [',', 'none'], ['symptomatic', 'none'], [',', 'none'], ['uncomplicated', 'none'],
                ['cystitis', 'none'], ['from', 'rborder'], ['the', 'none'], ['student', 'none'],
                ['health', 'none'], ['center', 'none'], ['at', 'none'], ['the', 'none'], ['University', 'none'], ['of', 'none'],
                ['Washington', 'none'], ['(', 'none'], ['Seattle', 'none'], [',', 'none'], ['WA', 'none'], [')', 'none'], ['from', 'none'],
                ['February', 'none'], ['2006', 'none'], ['through', 'none'], ['February', 'none'], ['2009', 'none'], ['.', 'none']

            ]

        },
        {
            sentNumber: 3,
            labelName: 'randomDescription',
            isExtractable: true,
            isSelfContanined: true,
            words: [
                ['The', 'none'], ['study', 'none'], ['participants', 'none'], ['were', 'none'], ['randomly', 'none'], ['assigned', 'none'],
                ['to', 'none'], ['Lactin-V', 'none'], ['or', 'none'], ['placebo', 'none'], ['by', 'none'], ['use', 'none'], ['of', 'rborder'],
                ['a', 'none'], ['computer-generated', 'none'], ['randomized', 'none'], ['number', 'none'],
                ['system', 'none'], ['in', 'none'], ['blocked', 'none'], ['assignments', 'none'], ['to', 'endborder'], ['achieve', 'none'],
                ['equal', 'none'], ['sample', 'none'], ['sizes', 'none'], ['in', 'none'], ['both', 'none'], ['groups', 'none'], ['.', 'none']

            ]

        },
        {
            sentNumber: 3,
            labelName: 'interventionName',
            isExtractable: true,
            isSelfContanined: true,
            words: [
                ['The', 'none'], ['study', 'none'], ['participants', 'none'], ['were', 'none'], ['randomly', 'none'], ['assigned', 'none'],
                ['to', 'rborder'], ['Lactin-V', 'none'], ['or', 'none'], ['placebo', 'none'], ['by', 'endborder'], ['use', 'none'], ['of', 'none'],
                ['a', 'none'], ['computer-generated', 'none'], ['randomized', 'none'], ['number', 'none'],
                ['system', 'none'], ['in', 'none'], ['blocked', 'none'], ['assignments', 'none'], ['to', 'none'], ['achieve', 'none'],
                ['equal', 'none'], ['sample', 'none'], ['sizes', 'none'], ['in', 'none'], ['both', 'none'], ['groups', 'none'], ['.', 'none']

            ]

        },
        {
            sentNumber: 4,
            labelName: 'blinding',
            isExtractable: true,
            isSelfContanined: true,
            words: [
                ['The', 'none'], ['assigned', 'none'], ['intervention', 'none'], ['substance', 'none'], ['(', 'none'], ['Lactin-V', 'none'],
                ['or', 'none'], ['placebo-V', 'none'], [')', 'none'], ['was', 'none'], ['packaged', 'none'], ['in', 'rborder'], ['identically', 'none'],
                ['appearing', 'none'], ['packets', 'none'], ['according', 'none'], ['to', 'none'],
                ['assignment', 'none'], ['and', 'none'], ['sequential', 'none'], ['study', 'none'], ['number', 'none'], ['.', 'none']
            ]

        }
    ]
};


module.exports.labelSet = {
    labelSetName: 'clinicalTrials',
    semanticLabels: [{ name: 'studyDesign' }, { name: 'aimOfStudy' }, { name: 'subjectDescription' }, { name: 'recruitmentDetails' },
    { name: 'nonSpeicific' }, { name: 'randomDescription' }, { name: 'interventionName' }, { name: 'blinding' }],
    phraseLabels: [{ name: 'rborder' }, { name: 'lborder' }, { name: 'endborder' }, { name: 'startborder' }]
}