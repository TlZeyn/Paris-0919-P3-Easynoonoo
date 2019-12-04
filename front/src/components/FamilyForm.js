import React, {useState} from 'react'

const FamilyForm = () => {

// state en hook pour les réponses

    const [answers1, setAnswers1] = useState('')
    const [answers2, setAnswers2] = useState()
    const [answers3, setAnswers3] = useState()


    return(
        <div>
            {/* question 1 toujours visible + envoi de la valeur dans le state answers1 */}

            <p className='question1'>Combien d'enfants sont gardés par la nounou ?</p>
            <input type = 'text'classname='answers1' value = {answers1} onChange = {e => setAnswers1(e.target.value)} min = '1' max = '10'/>

            {/* si on a plus d'un enfant question 2 apparait */}

            {answers1 > '1' ? <div><p className='question2'>Combien sont à vous ?</p> <input type = 'text'classname='answers2' value = {answers2} onChange = {e => setAnswers2(e.target.value)} min = "1" max = "10"/> </div> : console.log('nope')}

            {/* si l'utilisateur a mis plus d'enfants à lui que d'enfants gardés = message d'erreur1 */}
            
            {answers2 > answers1 ? <p>No trolling please !!</p> : console.log('ok')}

        {/* question 3 avec un radio check oui/non : -si on est en garde partagée avec une co-famille le calendrier apparait
        -si on a le même nb d'enfant dans question 1 et 2 = vérification si garde partagée avec un ex */}

            {answers2 < answers1 ? <p>Boum planning</p> : 
            <div><p className='question3'>L'enfant est-il en garde partagé avec l'autre parents ?</p>
            <div className="radio">
          <label>
            <input type="radio" value="oui" checked={answers3 === 'oui'} onChange = {e => setAnswers3(e.target.value)} />
            Oui
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="non" checked={answers3 === 'non'} onChange = {e => setAnswers3(e.target.value)} />
            Non
          </label>

        </div>
    </div>}

    {/* si on a 1 ou plusieurs enfant et pas de partage avec ex ni co-partage = erreur  */}
        {answers1 === '1' && answers3 === 'non' ?<p className='error1'>Tu payes tout lol</p> : console.log('lol')}
        {answers1 === answers2 && answers3 === 'non' ? <p>Tu payes tout lol</p> : console.log('jaaj')}

    {/* si on est en co-partage avec l'ex = planning apparait */}

        {answers1 === answers2 && answers3 === 'oui' || answers1 === '1' && answers3 === 'oui' ? <p>Boum planning</p> : console.log('joj')}

        </div>
    )
}

export default FamilyForm