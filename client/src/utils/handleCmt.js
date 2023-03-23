export const countCmt = (comments) => {
    let count = 0
    comments.forEach(comment => {
        count += comment?.reply.length
    });
    return count += comments.length
}