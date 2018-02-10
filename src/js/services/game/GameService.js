import Helpers from "../../components/container/helpers";

const direction = ['vertical', 'horizontal'];
export default class GameService {

    getSavedGame() {
        return Helpers.getUnparsedObjectFromLocalStorage('battleground');
    }

    retrieveShipPositions(ship, columns, rows) {
        let orientation = direction[Helpers.getRandomInt(0, 2)];
        let shipRow;
        let shipColumn;
        let positions = [];

        if (orientation === 'vertical') {
            shipRow = Helpers.getRandomInt(0, (9 - ship));
            shipColumn = Helpers.getRandomInt(1, (columns.length - 1));
            for (let i = 0; i < ship; i++) {
                let position = {'row': rows[shipRow + i], 'column': shipColumn};
                positions.push(position);
            }
        } else {
            shipRow = Helpers.getRandomInt(0, 9);
            shipColumn = Helpers.getRandomInt(1, (columns.length - ship));
            for (let i = 0; i < ship; i++) {
                let position = {'row': rows[shipRow], 'column': shipColumn + i};
                positions.push(position);
            }
        }
        return positions;
    }

    createBattlegroundMatrix(rows, columns, shipPositions) {
        let battleground = []
        rows.map(row => {
            columns.map(column => {
                let position = {'row': row, 'column': column};
                if (Helpers.haveShip(shipPositions, position)) {
                    battleground.push([row, column, 'ship'])
                } else {
                    battleground.push([row, column, 'free'])
                }
            });
        });
        return battleground;
    }

    saveBattleground(battleground){
        Helpers.saveToLocalStorage(battleground, 'battleground')
    }

    saveSolution(battleground){
        Helpers.saveToLocalStorage(battleground, 'battlegroundSolution')
    }

}