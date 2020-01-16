import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import FamilyAgenda from './FamilyAgenda'

import './FamilyForm.css'


const FamilyForm = () => {

  // initialize value to the one in the localstorage in the first render 
  const initialAnswer1 = () => Number(window.localStorage.getItem('answers1')) || 0
  const initialAnswer2 = () => Number(window.localStorage.getItem('answers2')) || 0
  const initialAnswer3 = () => window.localStorage.getItem('answers3')
  

  // state en hook pour les réponses
  const [answers1, setAnswers1] = useState(initialAnswer1)
  const [answers2, setAnswers2] = useState(initialAnswer2)
  const [answers3, setAnswers3] = useState(initialAnswer3)

  // state qui contient les prénoms des enfants
  const [myChild, setmyChild] = useState([])
  const [notMyChild, setNotMyChild] = useState([])

  // state intermédiaire qui contient la valeur des inputs
  const [firstname, setFirstname] = useState('')
  const [firstnameOthers, setFirstnameOthers] = useState('')

  // state qui permet de bloquer l'ajout d'enfant
  const [count, setCount] = useState(1)
  const [count2, setCount2] = useState(1)

  //state qui permet d'afficher les enfants sur le calendrier
  const [child1, setChild1] = useState([])

  //store the data in local storage
  useEffect( () => {
    window.localStorage.setItem('answers1', answers1)
    window.localStorage.setItem('answers2', answers2)
    window.localStorage.setItem('answers3', answers3)
    window.localStorage.setItem('myChild', JSON.stringify(myChild)) //transforme la valeur en strings dans un tableau
    window.localStorage.setItem('notMyChild', JSON.stringify(notMyChild))
    window.localStorage.setItem('items', JSON.stringify([]) )
    window.localStorage.setItem('items2', JSON.stringify([]) )
    window.localStorage.setItem('allChildren', JSON.stringify([]) )
    window.localStorage.setItem('child1', JSON.stringify(child1) )
  }, [answers1, answers2, answers3, myChild, notMyChild, child1]) //callback run if only the answers change
    
  // 1. stocke la nouvelle valeur de l'input dans la state myChild
  // 2. réinitialise firstname à vide
  // 3. écoute la valeur de l'input avec Count
  // 4. + cas pour l'enfant unique
  const handleName =  () => {
  if (count <= answers2) {
   setmyChild([...myChild, firstname]);
   setFirstname('');
   setCount(count+1)
  } if (count === 1 && answers2 === 0) {
    setmyChild([...myChild, firstname]);
    setFirstname('');
    setCount(count+1)
  } if (count > answers2) {
   setFirstname('')}
  }

  // même chose que handlename pour les enfants de l'autre famille
  const handleNameOthers = () => {
    if (count2 <= answers1 - answers2) {
      setNotMyChild([...notMyChild, firstnameOthers]);
      setFirstnameOthers('');
      setCount2(count2+1)
     } if (count2 > answers1 - answers2) {
      setFirstnameOthers('')
      }
   }

  // réinitialise les states quand on clique sur le premier input
   const restart1 = () => {
    setmyChild([]);
    setNotMyChild([]);
    setAnswers2(0);
    setCount(1);
    setCount2(1)
    setChild1([])
    window.localStorage.getItem('child1', JSON.stringify([]) )
    console.log(child1)

    


   }

  // réinitialise les states quand on clique sur le deuxième input
   const restart2 = () => {
    setmyChild([]);
    setNotMyChild([]);
    setCount(1);
    setCount2(1)
    setChild1([])
    window.localStorage.setItem('child1', JSON.stringify([]) )
   }

   const boumplanning = () => {
     document.getElementsByClassName('family')
   }

  return (
    <div className='familyFormParent'>

    <h2>Simulation de garde partagée</h2>

      <div className='familyForm'>
        
        {/* question 1 toujours visible + envoi de la valeur dans le state answers1 + converti la valeur obtenue en number*/}

        <div className='familyFormNumberInput'>
          <label className='question1'>Au total, combien d'enfants seront gardés par la nounou ?</label>
          <input className = 'familyFNumber' type='number' classname='answers1' value={answers1} onChange={e => setAnswers1(parseInt(e.target.value, 10))} min='1' max='5' onClick={() => restart1()} />      
        </div>

        {/* si on a plus d'un enfant question 2 apparait */}

        {answers1 > 1 ? <div className ='familyFormNumberInput'><label className='question2'>Parmi ces enfants, combien sont à vous ?</label> <input type='number' classname='answers2' value={answers2} onChange={e => setAnswers2(parseInt(e.target.value, 10))} min="1" max={answers1} onClick={() => restart2()} /> </div> : ''}


        {/* question 3 avec un radio check oui/non : garde partagée avec ex si plusieurs enfants */}

        {answers1 === answers2 && answers1 > 1 ?
          <div>
            <p className='question3'>La garde de vos enfants est-elle partagée avec un autre parent ?</p>
            <div className="radio">
              <label>
                <input type="radio" className='checked' value="oui" checked={answers3 === 'oui'} onChange={e => setAnswers3(e.target.value)} />
                Oui
                  </label>
            </div>

            <div className="radio">
              <label>
                <input type="radio" className='checked' value="non" checked={answers3 === 'non'} onChange={e => setAnswers3(e.target.value)} />
                Non
                   </label>
            </div>

          </div>
          : ''
        }

        {/* question 3 avec un radio check oui/non : garde partagée avec ex si un enfant */}

        {answers1 === 1 ?
          <div>
            <p className='question3'>La garde de votre enfant est-elle partagée avec un autre parent ?</p>
            <div className="radio">
              <label>
                <input type="radio" value="oui" checked={answers3 === 'oui'} onChange={e => setAnswers3(e.target.value)} />
                Oui
              </label>
            </div>

            <div className="radio">
              <label>
                <input type="radio" value="non" checked={answers3 === 'non'} onChange={e => setAnswers3(e.target.value)} />
                Non
               </label>
            </div>
          </div>
          : ''
        }

        {/* Message erreur si pas garde partagée  */}
        {answers1 === 1 && answers3 === 'non' ? <p className='error1'>La garde de l'enfant n'étant pas partagée, l'intégralité des coûts de celle-ci est à votre charge</p> : ''}

        {answers1 === answers2 && answers3 === 'non' ? <p className='error1'>La garde des enfants n'étant pas partagée, l'intégralité des coûts de celle-ci est à votre charge</p> : ''}


        {/* si on est en co-partage : la question des prénoms apparaît */}

        {answers1 === 1 && answers3 === 'oui' ?
        <div>
          <p className='question4'>Comment s'appelle l'enfant ?</p>
          <div className ='arrayChild'>
            <p>mon enfant :
              <input type='text'value={firstname} onChange={e => setFirstname(e.target.value)}/>
              {console.log({myChild})}
              <input type='button'onClick={() => handleName()} value='add' className='addButtonInputChild'/>
              {(myChild.map(e => <div>{e}</div>))}
            </p>
          </div>
        </div>: ''}

        {answers1 === answers2 && answers3 === 'oui' ?
        <div>
          <p className='question4'>Comment s'appellent les enfants ?</p>
          <div className ='arrayChild'>
            <p>mes enfants :
              <input type='text'value={firstname} onChange={e => setFirstname(e.target.value)}/>
              <input type='button'onClick={() => handleName()} value='add' className='addButtonInputChild'/>
              {(myChild.map(e => <div>{e}</div>))}
            </p>
          </div>
        </div>: ''}
        {answers2 < answers1 && answers2 !== 0 ?
        <div>
          <p className='question4'>Comment s'appellent les enfants ?</p>
            <div className ='arrayChild'>
              <p>mes enfants :
                <input type='text'value={firstname} onChange={e => setFirstname(e.target.value)}/>
                <input type='button'onClick={() => handleName()} value='add' className='addButtonInputChild'/>
                {(myChild.map(e => <div>{e}</div>))}
                </p>
              <p>les autres enfants :
              <input type='text' value={firstnameOthers} onChange={e => setFirstnameOthers(e.target.value)}/>
                <input type='button'onClick={() => handleNameOthers()} value='add' className='addButtonInputChild'/>
                {notMyChild.map(e => <div>{e}</div>)}
              </p>
            </div>
        </div>
         : ''}
        {/* enfants multiples en garde co-famille : calendrier apparait  */}
      {count === answers2 + 1 && count2 === answers1 - answers2 + 1 && count2 !== 1 ?
        <FamilyAgenda/> : ''}

         {/* enfants en garde partagée : calendrier apparait  */} 
        {count === answers1 + 1 && count2 === 1 && answers3 === 'oui' ? 
        <FamilyAgenda/>  : ''}

      <Link to='/'><p className="simFormReturn">Retour aux simulateurs</p></Link>
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default FamilyForm