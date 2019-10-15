export const updateUser = (id, attributes) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('users').doc(id).update({
            attributes: attributes
        }).then(() => {
            dispatch({ type: 'UPDATE_USER', attributes });
        }).catch((err) => {
            dispatch({ type: 'UPDATE_USER_ERROR', err })
        })
    }
}