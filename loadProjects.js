document.addEventListener("DOMContentLoaded", function() {
    fetch('projets/projet.json')
        .then(response => response.json())
        .then(projects => {
            const container = document.getElementById('projectsContainer');
            projects.forEach((project, index) => {
                let projectHtml = `
                    <div class="project">
                        <h2>${project.title}</h2>
                        <img src="${project.image}" alt="Image of ${project.title}">
                        <p>${project.description.join(" ")}</p>
                        <button onclick="toggleDetails(${index})">Voir plus</button>
                        <div id="details-${index}" class="project-details" style="display: none;">
                `;
                project.details.forEach(detail => {
                    projectHtml += `
                        <h3>${detail.title}</h3>
                        <p>${detail.paragraph}</p>
                        <img src="${detail.image}" alt="Image for ${detail.title}">
                    `;
                });
                projectHtml += `</div></div>`;
                container.innerHTML += projectHtml;
            });
        })
        .catch(error => console.error('Error:', error));
});

function toggleDetails(index) {
    const allDetails = document.querySelectorAll('.project-details');
    allDetails.forEach((details, detailsIndex) => {
        const project = details.parentNode;

        if (detailsIndex === index) {
            // Toggle the clicked project details
            if (details.classList.contains('open')) {
                details.classList.remove('open');
                details.style.maxHeight = '0';
                setTimeout(() => { details.style.display = 'none'; }, 300); // Hide after transition
                project.style.flexGrow = 0;
                project.style.flexBasis = 'auto'; // Reset to original size
            } else {
                details.classList.add('open');
                details.style.display = 'block';
                details.style.maxHeight = details.scrollHeight + 'px';
                project.style.flexGrow = 1;
                project.style.flexBasis = '100%'; // Expand to full width
            }
        } else {
            // Ensure other projects are reset to their original size
            if (details.classList.contains('open')) {
                details.classList.remove('open');
                details.style.maxHeight = '0';
                setTimeout(() => { details.style.display = 'none'; }, 300); // Hide after transition
                project.style.flexGrow = 0;
                project.style.flexBasis = 'auto';
            }
        }
    });
}


