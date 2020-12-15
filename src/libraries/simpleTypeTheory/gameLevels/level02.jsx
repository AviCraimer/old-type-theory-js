import React from 'react';
import {nextLevel} from "./constants";

const intro =
    (<React.Fragment>
        <p>You have created your first judgement and selected it. Way to go!</p>
        <p>The black area shows all the judgements you have created.</p>
        <p>Right below this area, there is an an area where you can see judgements you have selected.</p>
        <p>You can think of these selected judgements as the inputs to your rules.</p>
        <p>A rule will become active when the correct type of inputs are selected. A rule that cannot be used with the current selection will be greyed out and inactive.</p>
        <p>You will find two new rules. "Generic Type" and "Unit Type". Click each rule button with the empty context selected to produce new judgements.</p>
    </React.Fragment>)

const typeFormationJudgements =
(<React.Fragment>
    <p>You have used the two new rules too produce additional judgements. Notice that these judgements look a little different than our context judgement from before.</p>
    <p>These judgement contain the entailment symbol: "⊢" (also called the turnstile symbol) </p>
    <p>The left side of the turnstile is a <strong>context</strong>.</p>
    <p>The right side is a <strong>declaration</strong>.</p>

</React.Fragment>)

export const events = {
    onLoad: intro,
    onGoalsComplete: [typeFormationJudgements, nextLevel]
}