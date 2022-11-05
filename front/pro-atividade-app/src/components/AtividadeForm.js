import { useEffect, useState } from "react";

const atividadeInicial = {
  id: 0,
  prioridade: "0",
  titulo: "",
  descricao: "",
};

export default function AtividadeForm(props) {
  const [atividade, setAtividade] = useState(atividadeAtual());

  useEffect(() => {
    if (props.ativSelecionada.id !== 0) setAtividade(props.ativSelecionada);
  }, [props.ativSelecionada]);

  const inputTextHandler = (e) => {
    const { name, value } = e.target;

    setAtividade({ ...atividade, [name]: value });
  };

  function atividadeAtual() {
    if (props.ativSelecionada.id !== 0) {
      return props.ativSelecionada;
    } else {
      return atividadeInicial;
    }
  }

  const handleSumit = (e) => {
    e.preventDefault();

    if (props.ativSelecionada.id !== 0) 
      props.atualizarAtividade(atividade);
    else
      props.addAtividade(atividade);
    
      setAtividade(atividadeInicial);
  };

  const handlerCancelar = (e) => {
    e.preventDefault();

    props.cancelarAtividade();

    setAtividade(atividadeInicial);
  };

  return (
    <>
      <h1>Atividade {atividade.id !== 0 ? atividade.id : ""}</h1>
      <form className="row g-3" onSubmit={handleSumit}>
        <div className="col-md-6">
          <label className="form-label">Título</label>
          <input
            name="titulo"
            id="titulo"
            onChange={inputTextHandler}
            type="text"
            className="form-control"
            value={atividade.titulo}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Prioridade</label>
          <select
            name="prioridade"
            id="prioridade"
            onChange={inputTextHandler}
            className="form-select"
            value={atividade.prioridade}
          >
            <option defaultValue="0">Selecionar ...</option>
            <option value="1">Baixa</option>
            <option value="2">Normal</option>
            <option value="3">Alta</option>
          </select>
        </div>
        <div className="col-md-12">
          <label className="form-label">Descrição</label>
          <textarea
            name="descricao"
            id="descricao"
            onChange={inputTextHandler}
            type="text"
            className="form-control"
            value={atividade.descricao}
          />
        <hr />
        </div>
        <div className="col-12 mt-0">
          {atividade.id === 0 ? (
            <button className="btn btn-outline-secondary" type="submit">
              <i className="fas fa-plus me-2"></i>
              Atividade
            </button>
          ) : (
            <>
              <button
                className="btn btn-outline-success me-2"
                type="submit"
              >
                <i className="fas fa-plus me-2"></i>
                Salvar
              </button>
              <button
                className="btn btn-outline-warning"
                onClick={handlerCancelar}
              >
                <i className="fas fa-minus me-2"></i>
                Cancelar
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );
}
