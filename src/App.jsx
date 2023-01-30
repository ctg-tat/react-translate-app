import { useEffect, useState } from "react";

const App = () => {

  const [languages, setLanguages] = useState([]);
  const [form, setForm] = useState({
    source: "Hello, world!",
    output: "Привет, мир!",
    lang: "ru"
  });

  useEffect(() => {
    fetch("https://google-translate1.p.rapidapi.com/language/translate/v2/languages", {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': 'e738f9b57amsh3811f7ef2daeea6p13c52djsnbd1ed615999a',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
      }
    }).then((response) => response.json())
    .then((data) => {
      setLanguages(data.data.languages)
    });
  }, []);

  const LanguageOptions = languages.map(({language}) => {
    return(
      <option key={language} value={language}>
        {language}
      </option>
    )
  });


  const onClickTranslateHandle = () => {
    const body = {
      q: "Hello my dear friend!",
      target: "ru",
      source: "en"
    };


    fetch("https://google-translate1.p.rapidapi.com/language/translate/v2", {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': 'e738f9b57amsh3811f7ef2daeea6p13c52djsnbd1ed615999a',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
      },
      body: JSON.stringify(body)
    }).then((response) => response.json())
    .then((data) => console.log(data));
  }


  return(
    <section>
      <div className="container">
        <div className="wrapper">
          <h1>Translate</h1>

          <div className="form">
            {/* Левая часть */}
            <div className="form__left">
              <textarea name="source">
                hello, world!
              </textarea>
            </div>

            {/* Правая часть */}
            <div className="form__right">
              <select name="lang">
                {LanguageOptions}
              </select>

              <textarea name="output">
                привет, мир!
              </textarea>
            </div>
          </div>

          <button onClick={onClickTranslateHandle}>Translate Now</button>
        </div>
      </div>
    </section>
  )
}

export default App;