new Vue ({
    el: '#app',
    data: {
        monster_health: 100,
        player_health: 100,
        game_running: false,
        turns: []
    },
    methods: {
        start_game: function() {
            this.game_running = true;
            this.player_health = 100;
            this.monster_health = 100;
            this.turns = [];
        },
        attack: function() {
            this.player_attack()

            if(this.check_win()) {
                return;
            }

            this.monster_attack()

            this.check_win();
        },
        special_attack: function() {
            var damage = this.generate_damage(10, 20);
            this.monster_health -= damage;

            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits monster hard for ' + damage
            })

            if(this.check_win()) {
                return;
            }
            this.monster_attack();
            this.check_win();
        },
        heal: function() {
            if(this.player_health <= 90) {
                this.player_health += 10;
            } else {
                this.player_health = 100;
            }

            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10'
            })

            this.monster_attack();
        },
        give_up: function() {
            this.game_running = false;
        },
        player_attack: function() {
            const max = 10;
            const min = 3;
            var damage = this.generate_damage(min, max)

            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits monster for ' + damage
            })

            this.monster_health -= damage;
        },
        monster_attack: function() {
            const max = 12;
            const min = 5;
            var damage = this.generate_damage(min, max)

            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits player for ' + damage
            })

            this.player_health -= damage;
        },
        generate_damage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max), min)
        },
        check_win: function() {
            if(this.monster_health <= 0) {
                if(confirm('You Won! New Game?')){
                    this.start_game();
                } else {
                    game_running = false;
                }
                return true;
            }
            else if(this.player_health <= 0) {
                if(confirm('You Lost! New Game?')){
                    this.start_game();
                } else {
                    game_running = false;
                }
                return true;
            }
            return false;
        }
    }
})