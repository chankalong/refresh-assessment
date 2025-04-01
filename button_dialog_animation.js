const { animate, hover, press } = Motion

// Get all open buttons and overlay
const openButtons = document.querySelectorAll(".openButton")
const overlay = document.querySelector(".overlay")

const dialogOpenState = {
    opacity: 1,
    filter: "blur(0px)",
    rotateX: 0,
    rotateY: 0,
    z: 0,
}

const dialogInitialState = {
    opacity: 0,
    filter: "blur(10px)",
    z: -100,
    rotateY: 25,
    rotateX: 5,
    transformPerspective: 500,
}

// Function to get modal by ID
function getModalById(id) {
    return document.getElementById(id)
}

// Function to get all buttons within a modal
function getModalButtons(modal) {
    return {
        cancel: modal.querySelector(".cancel"),
        save: modal.querySelector(".save")
    }
}

// Set initial state for overlay
animate(overlay, { opacity: 0 }, { type: false })

// Function to open modal
function openModal(modalId) {
    const modal = getModalById(modalId)
    if (!modal) return

    // Set initial state for the modal
    animate(modal, dialogInitialState, { type: false })
    
    // Show modal
    modal.showModal()

    // Animate to open state
    animate(overlay, { opacity: 1 })
    animate(modal, dialogOpenState, {
        delay: 0.2,
        duration: 0.8,
        ease: [0.17, 0.67, 0.51, 1],
        opacity: {
            delay: 0.2,
            duration: 0.5,
            ease: "easeOut",
        },
    })
}

// Function to close modal
async function closeModal(modalId) {
    const modal = getModalById(modalId)
    if (!modal) return

    await Promise.all([
        animate(overlay, { opacity: 0 }),
        animate(modal, dialogInitialState, {
            duration: 0.3,
            ease: [0.67, 0.17, 0.62, 0.64],
        }),
    ])
    modal.close()
}

// Add click handlers to all open buttons
openButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modalId = button.getAttribute("data-modal")
        openModal(modalId)
    })
})

// Add click handlers to all modals
document.querySelectorAll(".modal").forEach(modal => {
    const modalId = modal.id
    const { cancel, save } = getModalButtons(modal)

    // Add click handlers to modal buttons
    cancel.addEventListener("click", () => closeModal(modalId))
    save.addEventListener("click", () => closeModal(modalId))

    // Handle escape key for each modal
    modal.addEventListener("cancel", (event) => {
        event.preventDefault()
        closeModal(modalId)
    })
})

// Handle click outside for all modals
document.addEventListener("click", (event) => {
    // Don't close if clicking any open button
    if (event.target.classList.contains("openButton")) return
    
    // Check if click is outside any open modal
    document.querySelectorAll(".modal").forEach(modal => {
        if (modal.open) {
            const { top, left, width, height } = modal.getBoundingClientRect()
            if (
                event.clientX < left ||
                event.clientX > left + width ||
                event.clientY < top ||
                event.clientY > top + height
            ) {
                closeModal(modal.id)
            }
        }
    })
}) 
