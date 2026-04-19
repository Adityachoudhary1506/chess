/**
 * Job Match Scorecard Analyzer Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inject the Right Sidebar Toggle Button into the Header if not present
    const headerActions = document.querySelector('.header-actions');
    if (headerActions && !document.getElementById('job-match-toggle')) {
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'job-match-toggle';
        toggleBtn.className = 'btn-icon-outline';
        toggleBtn.style.marginRight = '1rem';
        toggleBtn.title = 'Open Job Match Analyzer';
        toggleBtn.innerHTML = '<span class="material-icons-round">analytics</span>';
        toggleBtn.onclick = toggleJobMatchSidebar;

        // Insert before the profile section
        headerActions.insertBefore(toggleBtn, headerActions.lastElementChild);
    }
});

function toggleJobMatchSidebar() {
    const sidebar = document.getElementById('job-match-sidebar');
    const overlay = document.getElementById('job-match-overlay');
    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    } else {
        sidebar.classList.add('open');
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

async function analyzeJobMatch() {
    const candidateProfile = document.getElementById('jm-candidate-profile').value.trim();
    const jobRequirements = document.getElementById('jm-job-reqs').value.trim();
    const resultsContainer = document.getElementById('jm-results');
    const analyzeBtn = document.getElementById('jm-analyze-btn');

    if (!candidateProfile || !jobRequirements) {
        alert("Please enter both Candidate Profile and Job Requirements.");
        return;
    }

    // Loading State
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = '<span class="material-icons-round spin">sync</span> Analyzing...';
    resultsContainer.style.display = 'none';

    // Simulate API Delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock Result Generation based on input length (just for distinctness)
    // In a real app, this would call an AI backend.
    const overallScore = Math.floor(Math.random() * (95 - 60) + 60); // Random score between 60-95

    const scorecardHTML = `
        <div class="jm-scorecan-header">
            <h4>Analysis Result</h4>
            <div class="jm-overall-badge ${getScoreClass(overallScore)}">
                ${overallScore}/100
            </div>
        </div>
        
        <div class="jm-category-list">
            ${renderCategory('Educational Match', 90, 4)}
            ${renderCategory('Skills Match', 85, 5)}
            ${renderCategory('Experience Relevance', 70, 3)}
            ${renderCategory('Certifications', 80, 4)}
            ${renderCategory('Overall Fit', overallScore, 4)}
        </div>

        <div class="jm-section">
            <h5><span class="material-icons-round" style="color:#4CAF50; font-size:16px;">check_circle</span> Strengths</h5>
            <ul>
                <li>Strong educational background aligned with requirements.</li>
                <li>Proficient in key technical skills (Python, SQL).</li>
                <li>Good cultural fit potential based on soft skills.</li>
            </ul>
        </div>

        <div class="jm-section">
            <h5><span class="material-icons-round" style="color:#FF9800; font-size:16px;">warning</span> Gaps Identified</h5>
            <ul>
                <li>Experience duration is slightly below preferred range.</li>
                <li>Missing advanced certification in Cloud Computing.</li>
            </ul>
        </div>

        <div class="jm-section">
            <h5><span class="material-icons-round" style="color:#2196F3; font-size:16px;">lightbulb</span> Recommendations</h5>
            <ul>
                <li>Complete AWS or Azure certification to boost cloud skills.</li>
                <li>Highlight complex projects in the portfolio to offset experience gap.</li>
            </ul>
        </div>

        <div class="jm-verdict ${getVerdictClass(overallScore)}">
            <strong>Hiring Recommendation:</strong> ${getVerdictText(overallScore)}
        </div>
    `;

    resultsContainer.innerHTML = scorecardHTML;
    resultsContainer.style.display = 'block';

    // Reset Button
    analyzeBtn.disabled = false;
    analyzeBtn.innerHTML = 'Analyze Match';
}

function renderCategory(title, score, stars) {
    const starStr = '⭐️'.repeat(stars) + '☆'.repeat(5 - stars);
    return `
        <div class="jm-category-item">
            <div class="jm-cat-top">
                <span>${title}</span>
                <span class="jm-cat-score">${score}/100</span>
            </div>
            <div class="jm-cat-stars">${starStr}</div>
            <div class="jm-progress-bg">
                <div class="jm-progress-fill" style="width:${score}%"></div>
            </div>
        </div>
    `;
}

function getScoreClass(score) {
    if (score >= 80) return 'score-high';
    if (score >= 60) return 'score-med';
    return 'score-low';
}

function getVerdictClass(score) {
    if (score >= 80) return 'verdict-strong';
    if (score >= 60) return 'verdict-good';
    return 'verdict-weak';
}

function getVerdictText(score) {
    if (score >= 80) return 'Strong Match - Highly Recommended';
    if (score >= 60) return 'Good Match - Recommended with minor development';
    return 'Moderate/Weak Match - Consider with reservations';
}
