// Load the file content into the viewer and editor
async function loadContent() {
    try {
        const response = await fetch('/getContent');
        const data = await response.text();
        document.getElementById('viewer').value = data;  // Display in read-only viewer
        document.getElementById('editor').value = data;  // Display in editable box
    } catch (error) {
        console.error('Error loading content:', error);
        alert('Could not load the content.');
    }
}

// Save the content from the editor back to the file
async function saveContent() {
    const newContent = document.getElementById('editor').value;
    try {
        const response = await fetch('/saveContent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: newContent })
        });
        const result = await response.text();
        alert(result);

        // Update the viewer box with the new content
        document.getElementById('viewer').value = newContent;
    } catch (error) {
        console.error('Error saving content:', error);
        alert('Could not save the content.');
    }
}

document.getElementById('saveButton').addEventListener('click', saveContent);

// Load content on page load
window.onload = loadContent;
