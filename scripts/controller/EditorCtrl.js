define(function (require) {
    var Model = require('scripts/model/all');
    var SongPlayer = require('es6!scripts/song-player');
    var Instruments = require('scripts/instruments/all');
    var View = require('scripts/controller/TrackViewCtrl');

    var EditorCtrl =  function ($scope, $modal) {
        var self = this;
        $scope.song = new Model.Song();
        self.view = new View($scope);

        self.noteDuration = 4;
        self.selectedInstrument = new Instruments.NoteCreationInstrument(self, $scope);
        init();

        $scope.$watch('activeTrack.instrument', function(){
            SongPlayer.updateInstruments($scope.song);
        }, true);

        function init(){
            initButtons();
            initHotkeys();
        }

        self.setNoteDuration = function(duration){
            self.noteDuration = duration;
            $scope.selection[0].tickable.duration = duration;
        };

        self.setActiveTrack = function(track){
            $scope.activeTrack = track;
        };

        self.getAllInstruments = function(){
            return Model.Instrument.getAllInstruments();
        };

        self.changeTrackInstrument = function(id){
            $scope.activeTrack.instrument = _.find(Model.Instrument.getAllInstruments(), function(instr){
                return instr.id = id;
            });
        };

        self.newTrack = function(){
            var bar = new Model.Bar([], "4/4");
            var track = new Model.Track([bar], new Model.Instrument("acoustic_grand_piano"));
            $scope.song.tracks.push(track);
            $scope.activeTrack = track;
            return track;
        };

        self.removeTrack = function(track){
            var index = $scope.song.tracks.indexOf(track);
            $scope.song.tracks.splice(index, 1);
            $scope.activeTrack = $scope.song.tracks[index > 0 ? index - 1: index];
        };

        function initButtons(){


            $scope.play = function() {
                SongPlayer.play($scope.song, $scope.selection[0]);
            }
            $scope.stop = function() {
                SongPlayer.stop();
            }


            $('.tickable.note').click(function(event){
                $('.tickables .tickable').removeClass('active');
                $(event.target).addClass('active');
                self.selectedInstrument = new Instruments.NoteCreationInstrument(self, $scope);
            });

            $('.tickable.rest').click(function(event){
                $('.tickables .tickable').removeClass('active');
                $(event.target).addClass('active');
                self.selectedInstrument = new Instruments.RestCreationInstrument(self, $scope);
            });

            $(document)
                .on('playerReady', function () {
                    $scope.$apply(function(){
                        $scope.playerReady = true;
                    })
                })
                .on('playerLoading', function () {
                    $scope.playerReady = false;
                });
        }

        function initHotkeys(){

            $(document).bind('keydown', 'del', function(){
                $scope.$apply(function(){
                    _.each($scope.selection, function(ti){
                        ti.remove();
                    });
                    $scope.selection = null;
                });
            });

        }

        this.newTrack();

    };

    return EditorCtrl;
});