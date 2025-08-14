import { LightningElement } from 'lwc';

const devFundWeight = 0.23;
const processAutoWeight= 0.30;
const userIntWeight = 0.25;
const testDebugDeployWeight = 0.22;
const passingScore = 68;

export default class PlatformDevCertCalculator extends LightningElement {
    
    devFundamentalScore = 50;
    processAutoScore = 50;
    userInterfaceScore = 50;
    testDebugDeployScore = 50;
    
    certificationScore = 90;
    numberOfQuestions = 60;
    showResources = false;
    showGoodJob = true;

    currentHistoryId = 0;

    attemptHistory = [{Id: 1, Score: 50},{Id: 2, Score: 25},{Id: 3, Score: 100}];
    calculateScore() {
        let devFundWeightScore = this.devFundamentalScore * devFundWeight;
        let processAutoWeightScore = this.processAutoScore * processAutoWeight;
        let userIntWeightScore = this.userInterfaceScore * userIntWeight;
        let testDebugDeployWeightScore = this.testDebugDeployScore * testDebugDeployWeight;

        this.certificationScore = devFundWeightScore + processAutoWeightScore + userIntWeightScore + testDebugDeployWeightScore;

        this.showResourceIfFailed();
        this.addAttempHistory(this.certificationScore);
    }
    
    handleChange(event) {

        console.log(event.target.name, event.target.value);
        console.log(event.target.type);
        console.log(event.target.label);
        const inputName = event.target.name;
        let value = Number(event.target.value);

        if (inputName === 'devFundamentals') {
            this.devFundamentalScore = value;
        } else if (inputName === 'processAutomation') {
            this.processAutoScore =value;
        } else if (inputName === 'userInterface') {
            this.userInterfaceScore = value;
        } else if (inputName === 'testDebugDeploy') {
            this.testDebugDeployScore = value;
        }
    }

    showResourceIfFailed() {
        if (this.certificationScore < passingScore) {
            this.showResources = true;
        } else {
            this.showResources = false;
        }
        this.showGoodJob = !this.showResources;
    }

    addAttempHistory(Score) {
        this.currentHistoryId ++;
        const attempt = 
            {
                Id: this.currentHistoryId, Score
            }
        this.attemptHistory = [...this.attemptHistory, attempt];
    }

    deleteAttemptHandler(event){
        console.log('This is called from parent to handle delete', event.detail);
        let attemptId = event.detail;
        this.attemptHistory = this.attemptHistory.filter(attempt => attempt.Id != attemptId);
        console.log('New attempt history ' + this.attemptHistory);
    }

    connectedCallback() {
        this.currentHistoryId = this.attemptHistory.length;
    }
}