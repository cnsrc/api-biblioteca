const express = require('express');

/*CONFIGURAÇÃO DAS ROTAS DO AUTOR*/
const router = express.Router();

/* IMPORT DA MODEL DO AUTOR */
const modelAutor = require('../model/AutorModel');

/* PARAMETROS DE ROTAS (QUALQUER VERBO):
1 - NOME DA ROTA - REPRESENTADO POR UMA STRING
2 - CALLBACK QUE TRATA REQUISIÇÃO (req) E RESPOSTA (res)
*/
/*ROTAS DE CRUD DO AUTOR:*/
router.get('/listarCategoria', (req, res)=>{

    // console.log('TESTE DE ROTA GET DO AUTOR');
    // console.log('----A REQUISIÇÃO GET PASSOU PELA CATEGORIA CONTROLLER----');
    // res.send('----TESTE DE ROTA GET DE CATEGORIAS----');

    //LISTANDO OS DADOS SEM CRITÉRIOS
    modelAutor.findAll()
        .then(
            (autor)=>{
                return res.status(200).json(autor);
            }
        ).catch(
            (erro)=>{
                return res.status(400).json({
                    erroStatus: true,
                    erroMessagem: 'Houve um erro ao selecionar os dados do autor',
                    erroBancoDados: erro
                });
            }
        );

});

//LISTANDO OS DADOS COM CRITÉRIOS
router.get('/listarAutor/:id',(req, res)=>{

    let {id} = req.params;

    modelAutor.findByPk(id)
        .then(
            (autor)=>{
                res.status(200).json(autor);
            }
        ).catch(
            (erro)=>{
                return res.status(400).json({
                    erroStatus: true,
                    erroMessagem: 'Houve um erro ao selecionar os dados do autor',
                    erroBancoDados: erro
                });
            }
        );

});

router.post('/inserirAutor', (req, res)=>{
    // console.log('A REQUISIÇÃO POST PASSOU PELA AUTOR CONTROLLER');
    // res.send('TESTE DE ROTA POST DE CATEGORIAS');

    //RECEBER OS DADOS
    // console.log(req.body.nome_categoria);
    // let nome_categoria = req.body.nome_categoria;
    let {nome_autor} = req.body;
    // console.log(nome_categoria);
    
    //GRAVAR OS DADOS
    modelAutor.create(
        {nome_autor}
    ).then(
        ()=>{
                return res.status(201).json({
                    erroStatus: false,
                    menssagemStatus: 'Autor inserido com sucesso!'
            });
        }
    ).catch(
        (erro)=>{
                    return res.status(400).json({
                        erroStatus: true,
                        erroMessagem: 'Houve um erro ao cadastrar o autor',
                        erroBancoDados: erro
                    });
        }
    );

});

router.put('/alterarAutor', (req, res)=>{

    // console.log('A REQUISIÇÃO PUT PASSOU PELA CATEGORIA CONTROLLER');
    // res.send('TESTE DE ROTA PUT DE AUTOR');

    //RECEBENDO OS DADOS:
    let {id, nome_autor} = req.body;

    //ALTERANDO OS DADOS:
    modelAutor.update(
        {nome_autor},
        {where:{id}}
    ).then( ()=>{

        return res.status(200).json({
            erroStatus: false,
            menssagemStatus: 'Autor alterado com sucesso!'
        });

    }).catch(
        (erro)=>{
                    return res.status(400).json({
                        erroStatus: true,
                        erroMessagem: 'Houve um erro ao alterar o autor',
                        erroBancoDados: erro
                    });
        }
    );

});

router.delete('/excluirAutor/:id', (req, res)=>{

    // console.log('A REQUISIÇÃO DELETE PASSOU PELO AUTOR CONTROLLER');
    // res.send('TESTE DE ROTA DELETE DE AUTOR');

    let {id} = req.params;

    modelAutor.destroy(
        {where: {id}}
    ).then( ()=>{

        return res.status(200).json({
            erroStatus: false,
            menssagemStatus: 'Autor excluido com sucesso!'
        });

    }).catch(
        (erro)=>{
                    return res.status(400).json({
                        erroStatus: true,
                        erroMessagem: 'Houve um erro ao excluir o autor',
                        erroBancoDados: erro
                    });
        }
    );

});

module.exports = router;