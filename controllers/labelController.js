const Label = require('../models/nlpLabels');


module.exports.index = async (req, res) => {
    try {
        const labels = await Label.find({});
        res.render('labels/label', { labels })
    } catch {
        console.log(error)
    }
}


module.exports.newSemanticTag = async (req, res) => {
    try {
        const { id } = req.params;
        const labels = await Label.findById(id)
        const { label } = req.body;
        // console.log(labels.semanticLabels);
        if (label.name !== '') {
            labels.semanticLabels.push({ 'name': label.name });
            await labels.save();
        }
        req.flash('success', 'Successfully add a new tag.')
        res.redirect(`/labels/{id}`)
    } catch {
        console.log(error)
    }
}


module.exports.newSyntacticTag = async (req, res) => {
    try {
        const { id } = req.params;
        const labels = await Label.findById(id)
        const { label } = req.body;
        // console.log(labels);
        if (label.name !== '') {
            labels.phraseLabels.push({ 'name': label.name });
            await labels.save();
        }
        req.flash('success', 'Successfully add a new tag.')
        res.redirect(`/labels/{id}`)
    } catch {
        console.log(error)
    }
}


module.exports.deleteSemanticTag = async (req, res) => {
    try {
        const { id } = req.params;
        const labels = await Label.findById(id)
        const { label } = req.body;
        labels.semanticLabels.pull({ 'name': label.name });
        await labels.save();
        // console.log(labels.semanticLabels);

        res.redirect(`/labels/{id}`)
    } catch {
        console.log(error)
    }
}

module.exports.deleteSyntacticTag = async (req, res) => {
    try {
        const { id } = req.params;
        const labels = await Label.findById(id)
        const { label } = req.body;
        labels.phraseLabels.pull({ 'name': label.name });
        await labels.save();
        // console.log(labels.semanticLabels);
        res.redirect(`/labels/{id}`)
    } catch {
        console.log(error)
    }
}
