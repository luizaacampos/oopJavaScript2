import { DOMHelper } from '../Utility/DOMHelper'

export class ProjectItem {
    // hasActiveTooltip = false

    constructor(id, updateProjectsListsFunction, type) {
        this.id = id
        this.hasActiveTooltip = false
        this.updateProjectsListsHandler = updateProjectsListsFunction
        this.connectSwitchButton(type)
        this.connectMoreInfoButton()
        this.connectDrag()
    }

    showMpreInfoHandler() {
        if (this.hasActiveTooltip) {
            return
        }
        const projectElement = document.getElementById(this.id)
        const tooltipText = projectElement.dataset.extraInfo
        import('./Tooltip.js').then(module => {
            const tooltip = new module.Tooltip(() => {
                this.hasActiveTooltip = false
            }, tooltipText, this.id)
            tooltip.attach()
            this.hasActiveTooltip = true
        })
    }

    connectDrag() {
        document.getElementById(this.id).addEventListener('dragstart', event => {
            event.dataTransfer.setData('text/plain', this.id)
            event.dataTransfer.effectAllowed = 'move'
        })
    }

    connectMoreInfoButton() {
        const projectItemEl = document.getElementById(this.id)
        let moreInfoButton = projectItemEl.querySelector('button:first-of-type')
        moreInfoButton.addEventListener('click', this.showMpreInfoHandler.bind(this))
    }

    connectSwitchButton(type) {
        const projectItemEl = document.getElementById(this.id)
        let switchButton = projectItemEl.querySelector('button:last-of-type')
        switchButton = DOMHelper.clearEventListeners(switchButton)
        switchButton.textContent = type === 'active' ? 'finish' : 'activate'
        switchButton.addEventListener('click', this.updateProjectsListsHandler.bind(null, this.id))
    }

    update(updateProjectListsFn, type) {
        this.updateProjectListsHandler = updateProjectListsFn
        this.connectSwitchButton(type)
    }
}