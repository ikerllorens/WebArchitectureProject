/* global Backbone, App, _ */

App.views.MateriasView = Backbone.View.extend({
    initialize: function () {
        console.log('Initializing Materias View');

        _.bindAll(this, 'populateMaterias', 'populateMateriasInfo', 'addTable', 'searchEnter');
        
        this.infoView = new App.views.MateriasInfoView();
        this.collection = new App.collections.MateriasCollection();
        this.listenTo(this.collection, "sync", this.populateMaterias);
        this.listenTo(this.infoView.collection, "sync", this.populateMateriasInfo);

    },
    events: {
        "change #incReflexiones": "toggleReflexiones",
        "click .materiaInfo": "materiaInfo",
        "click .buscarMaterias": "search",
        "keypress #nombreClave": "searchEnter",
        "click #verOptativas": "verOptativas",
        "change #carrera": "toggleOptativas"
    },
    render: function () {
        $(this.el).html(this.template());
        
        var _this = this;
        
        _(function () {
            _this.populateCarreras();
            _this.addTable();
            _this.fix();
        }).defer();
        
        return this;
    },
    fix: function () {
        var tableHeight = $('#tableContainer').height();
        $('.tableWell').css({"height": tableHeight + 30});
//        if (window.screen.width > 450) {
//            var heights = $(".sameHeight").map(function () {
//                return $(this).height();
//            }).get(),
//                    maxHeight = Math.max.apply(null, heights);
//
//            $(".sameHeight").height(maxHeight);
//        }
    },
    search: function () {
        var nombreClave = $('#nombreClave').val();
        var carrera = $('#carrera').val();
        var semestre = $('#semestre').val();
        var incReflexiones = $('#incReflexiones').is(":checked") ? "true" : "false";
        var reflexiones = $('#reflexiones').val();

        var searchParams = {
            "nomCla": nombreClave,
            "carrera": carrera,
            "semestre": semestre,
            "incReflexiones": incReflexiones,
            "reflexion": reflexiones,
            "varOptativa": false,
            "token": window.sessionStorage.getItem('token')
        };
        this.collection.fetch({data: $.param(searchParams)});
    },
    verOptativas: function () {
        var carrera = $('#carrera').val();
        
        var searchParams = {
            "varOptativa": true,
            "carrera": carrera,
            "token": window.sessionStorage.getItem('token')
        };
        
        this.collection.fetch({data: $.param(searchParams)});
    },
    searchEnter: function (e) {
        if (e.which === 13) {
            this.search();
        }
    },
    populateCarreras: function () {
        $.getJSON("../main/assets/resources/carreras.json", function (data) {
            $.each(data, function (index, carrera) {
                $('#carrera').append('<option value="' + carrera.nombre + '">' + carrera.nombre + '</option>');
            });
        });
    },
    toggleOptativas: function () {
        if ($('#carrera') != 'Carrera') {
            $('#verOptativas').prop("disabled",false);
        }
    },
    toggleReflexiones: function (e) {
        var _this = e.currentTarget;
        if ($(_this).is(":checked")) {
            $("#reflexiones").prop("disabled", false);
        } else {
            $("#reflexiones").prop("disabled", "disabled");
        }
    },
    materiaInfo: function (e) {
        var $this = e.currentTarget;
        var row = $($this).closest("tr");
        var tds = row.find("td");
        var id = $(tds[0]).text();
        var nombre = $(tds[1]).text();
        
        $('#materiasInfoNombre').html(nombre);
        var params = {
            idMateria: id,
            token: window.sessionStorage.getItem('token')
        };
        this.infoView.collection.fetch({data: $.param(params)});
        
    },
    addTable: function () {
        var infoBtn = '<div class="text-left"><button class="btn btn-info materiaInfo" type="button" data-toggle="modal" data-target="#materiasInfoDialog"><span class="glyphicon glyphicon-info-sign"></span></button></div>';
        this.materiasTable = $('#materiasTable').DataTable({
            columns: [
                {data: 'clave'},
                {data: 'nombre'},
                {data: 'depto'},
                {data: 'horas'},
                {data: 'creditos'},
                {
                    "mData": null,
                    "sDefaultContent": infoBtn,
                    "searchable": false,
                    "sortable": false,
                    "orderable": false,
                    "width": "10px"
                }
            ],
            "dom": '<f<t>lip>',
            responsive: true,
            "oLanguage": {
                "sProcessing": "Procesando...",
                "sLengthMenu": "Mostrar _MENU_ registros",
                "sZeroRecords": "No se encontraron resultados",
                "sEmptyTable": "No hay nada que mostrar",
                "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix": "",
                "sSearch": "",
                "sUrl": "",
                "sInfoThousands": ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                    "sFirst": "Primero",
                    "sLast": "Último",
                    "sNext": "Siguiente",
                    "sPrevious": "Anterior"
                },
                "oAria": {
                    "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                }
            }
        });
        $('.dataTables_filter input').attr("placeholder", "Filtrar resultados");
        $('.dataTables_filter').css({"float": "left", "text-align": "left"});
    },
    populateMaterias: function () {
        //console.log(JSON.stringify(this.collection.toJSON()));
        this.materiasTable.clear();
        this.materiasTable.rows.add(this.collection.toJSON());
        this.materiasTable.draw();
        this.fix();
    },
    populateMateriasInfo: function () {
        this.$('#materiasInfoData').html(this.infoView.render().el);
    }
});