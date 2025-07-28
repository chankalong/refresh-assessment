try {
  document.querySelector('#activity-apply-btn').remove();
} catch (e) {
  console.warn('Element #activity-apply-btn not found, so it could not be removed.');
}