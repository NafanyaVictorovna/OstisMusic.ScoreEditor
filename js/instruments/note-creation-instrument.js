OSTISMusic.Instrument.NoteCreationInstrument = function(editor){

    this.scoreClick = function(e){
        var coords = editor.view.getLocalCoords(e);
        var note = editor.view.findNote(coords);
        if(note){
            noteClicked(note);
            return;
        }
        var lastNote = editor.view.findPreviousNote(coords);
        if(lastNote){
            addNote(coords);
        }
    };

    this.mouseMove = function(e){
        var coords = editor.view.getLocalCoords(e);
        var note = editor.view.findNote(coords);
        var prevNote = editor.view.findPreviousNote(coords);
        if(note){
            editor.view.highlightNote(note);
        }
        else if (prevNote){
            coords.y = coords.y - coords.y % 5;
            coords.x = prevNote.view.getAbsoluteX() + prevNote.view.getBoundingBox().w + 15;
            editor.view.phantomNote(coords);
        }
    };

    function noteClicked(note){
        editor.player.playNote([note.view]);
        editor.view.setSelectedNote(note.index);
    }

    function addNote(point){
        var prevNote = editor.view.findPreviousNote(point);
        var note = editor.view.getNewNoteByPos(point);
        var chord = new OSTISMusic.Chord(editor.newNoteDuration, [note]);
        editor.song.insertTickable(prevNote.index+1, chord);
        editor.update();
        editor.view.setSelectedNote(prevNote.index+1);
    }
};