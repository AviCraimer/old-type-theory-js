import React from 'react';
import {nextLevel} from "./constants";
//Level 1, the Empty Context

const intro =
    (<React.Fragment>
        <p>
            In the beginning there was nothing.
        </p>
        <p>
            The first rule of type theory says that from nothing, you can create a context.
        </p>
        <p>
            A context is simply a list of already established definitions. To start you have not established any definitions, so your context is an empty list.
        </p>
        <p>
            But how do we know that an empty list is a valid context in our type system? That is declared by fiat by our first rule. The Empty Context rule says, that yes, you can make a context from no prior assumptions and this context is precisely a list of definitions with nothing in it.
        </p>
        <p>To apply the rule, simply click on the rule button</p>
    </React.Fragment>)


const firstJudgement =
(<React.Fragment>
<p>You will see the first judgement appear in the black displace.</p>
<p>But wait, what is a judgement? A judgement is how we say something in type theory.</p>
<p>There are several kinds of judgements, the first rule gives you the first kind, a <strong>context judgment</strong></p>
<p>
    When we say something in type To say that a context is well formed, we simply write the context followed by the word context.
</p>
<p>Since the empty context has nothing in it, we write a dot as a placeholder. So ". context" says simply: "The empty context is a context."</p>
<p>Now that you have your first judgement, you can select the judgement by clicking on it. Try it now!</p>
</React.Fragment>
)


export const events = {
    onLoad: intro,
    onGoalsComplete: [firstJudgement, nextLevel]
}