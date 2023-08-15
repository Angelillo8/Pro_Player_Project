import { useState,useEffect } from "react"

class Decision{
playerToPass;
dTree
// dTree = {
//         node: "s1",
//         title: "Here is your opportunity to shine. Take the right decision to help your team win: ",
//         children: [
//             {
//                 node: "s2",
//                 title: "Shoot to score for your team",
//                 endType: "Shoot"
//             },
//             {
//                 node: "s3",
//                 title: "Pass the ball to one of your teammates>",
//                 children:[
//                     {
//                         node: "s4",
//                         title: `Pass the ball to ${this.playerToPass}`,
//                         endType: "Pass"
//                     },
//                     {
//                         node: "s5",
//                         title: "Dribble the defender to have better chances>",
//                         children:[
//                             {
//                                 node: "s6",
//                                 title: "Shoot you have more ",
//                                 endType: "Shoot"
//                             },
//                             {
//                                 node:"s7",
//                                 title: `Pass to ${this.playerToPass}. He is the best option`,
//                                 endType: "Pass"
//                             }
//                         ]
//                     }
//                 ]
//             }
//         ]
//     }

    constructor(playerToPass){
        this.playerToPass = playerToPass.name
        this.dTree = {
            node: "s1",
            title: "Here is your opportunity to shine. Take the right decision to help your team win: ",
            children: [
                {
                    node: "s2",
                    title: "Shoot to score for your team",
                    endType: "Shoot"
                },
                {
                    node: "s3",
                    title: "Pass the ball to one of your teammates>",
                    children:[
                        {
                            node: "s4",
                            title: `Pass the ball to ${this.playerToPass}`,
                            endType: "Pass"
                        },
                        {
                            node: "s5",
                            title: "Dribble the defender to have better chances>",
                            children:[
                                {
                                    node: "s6",
                                    title: "Shoot you have more ",
                                    endType: "DShoot"
                                },
                                {
                                    node:"s7",
                                    title: `Pass to ${this.playerToPass}. He is the best option`,
                                    endType: "DPass"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    };

    getTitles(node){
        if("s1" === node){
            return this.dTree.title
        }else if( node === "s3"){
            return this.dTree.children[1].title
        }else if(node === "s5"){
            return this.dTree.children[1].children[1].title
        }else if(node === "s2" || node === "s6"){
            return this.dTree.children[0].endType
        }
        return this.dTree.children[1].children[0].endType
    }
    getChildren(node){
        if("s1" === node){
            return this.dTree.children
        }else if( node === "s3"){
            return this.dTree.children[1].children
        }else if(node === "s5"){
            return this.dTree.children[1].children[1].children
        }
        return[]
    }

}
export default Decision

