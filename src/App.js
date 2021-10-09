import { useState } from 'react'
import './App.css';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import BigNumber from "bignumber.js"

// p, g is generic public params\\

const checkPrimeNumber = (number) => {
  for( let i = 2; i < Math.sqrt(number); i++) {
    if(number % i === 0) return false;
  }
  return true;
}

Yup.addMethod(Yup.number, "checkPrimeNumber", function (errorMessage) {
  return this.test(`test-prime-number`, errorMessage, function (value) {
    const { path, createError } = this;

    return (
      checkPrimeNumber(value) ||
      createError({ path, message: errorMessage })
    );
  });
});

function App() {
  const [YaResult, setYaResult] = useState("");
  const [YbResult, setYbResult] = useState("");
  const [KResult, setKResult] = useState("");


  const initialValues = {
    p: "",
    g: "",
    Xa: "",
    Xb: ""
,  }

  const validationSchema = Yup.object().shape({
    p: Yup.number().checkPrimeNumber("Bạn cần nhập số nguyên tố"),
    g: Yup.number().typeError("Bạn cần nhập số nguyên"),
    Xa: Yup.number().typeError("Bạn cần nhập số nguyên"),
    Xb: Yup.number().typeError("Bạn cần nhập số nguyên")
  });

  const submit = (value) => {
    const p = new BigNumber(value.p);
    const g = new BigNumber(value.g);
    const Xa = new BigNumber(value.Xa);
    const Xb = new BigNumber(value.Xb);
    const Ya = g.exponentiatedBy(Xa).modulo(p);
    const Yb = g.exponentiatedBy(Xb).modulo(p);
    const K = Ya.exponentiatedBy(Xb).modulo(p);
    setYaResult(Ya.toString())
    setYbResult(Yb.toString())
    setKResult(K.toString())
  }

  return (
    <div className="App">
      <div className="container">
      <div className="title">
        Diffie Hellman
      </div>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submit}>
        {({errors, touched})=> (
          <Form className="form">   
            <div className="params-p">
              <div className="params-text">
                Nhập tham số p:
              </div>
              <Field type="number" name="p" />
              {errors.p && touched.p && <div className="error">{errors.p}</div>}    
            </div>
            <div className="params-g">
              <div className="params-text">
                Nhập tham số g:
              </div>
              <Field type="number" name="g" />
              {errors.g && touched.g && <div className="error">{errors.g}</div>}    
            </div>
            <div className="params-Xa">
              <div className="params-text">
                Nhập khóa riêng Xa:
              </div>
              <Field type="number" name="Xa" />
              {errors.Xa && touched.Xa && <div className="error">{errors.Xa}</div>}    
            </div>
            <div className="params-Xa">
              <div className="params-text">
                Nhập khóa riêng Xb:
              </div>
              <Field type="number" name="Xb" />
              {errors.Xb && touched.Xb && <div className="error">{errors.Xb}</div>}    
            </div>
            <div className="button-submit">
              <button type="submit">Xác nhận</button>
            </div>
        </Form>
        )}
      </Formik>
      <div className="result">
        <div className="result-text">
          Kết quả tính toán:
        </div>
        <div className="key-Ya key">
          Khóa công khai Ya: <span className="result-key">{YaResult ? YaResult : "???"}</span>
        </div>
        <div className="key-Yb key">
          Khóa công khai Yb: <span className="result-key">{YbResult ? YbResult : "???"}</span>
        </div>  
        <div className="secret-key">
          Khóa bí mật K: <span className="result-secret-key">{KResult ? KResult : "???"}</span>
        </div>
      </div>  
      </div>
      
    </div>
  );
}

export default App;
