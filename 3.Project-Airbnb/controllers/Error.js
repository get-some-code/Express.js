exports.error = (req, res) => {
    res.status(404).render('store/404', {pageTitle: '404 Page Not Found'});
};