module.exports.corpus = {
    name: 'rUTIProbiotics',
    sentences: [
        {
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

        }
    ]
};


module.exports.labelSet = {
    labeSetName: 'clinicalTrials',
    semanticLabels: [{ name: 'studyDesign' }, { name: 'aimOfStudy' }, { name: 'subjectDescription' }, { name: 'recruitmentDetails' }, { name: 'nonSpeicific' }],
    phraseLabels: [{ name: 'rborder' }, { name: 'lborder' }, { name: 'endborder' }, { name: 'startborder' }]
}