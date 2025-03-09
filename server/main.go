package main

import (
    "encoding/json"
    "net/http"
    "rally-game/server/physics"
)

type ControlRequest struct {
    Action string `json:"action"`
}

type PhysicsResponse struct {
    X, Y, Z  float64
    Rotation float64
    Speed    float64
    Gear     string
}

var carState = physics.CarState{
    Position: physics.Vector3{X: 0, Y: 0, Z: 0},
    Velocity: physics.Vector3{X: 0, Y: 0, Z: 0},
    Rotation: 0,
    Gear:     "N",
}

func main() {
    http.HandleFunc("/control", func(w http.ResponseWriter, r *http.Request) {
        var req ControlRequest
        json.NewDecoder(r.Body).Decode(&req)
        carState = physics.UpdateCar(carState, req.Action, "dirt")
        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(carState)
    })

    http.HandleFunc("/physics", func(w http.ResponseWriter, r *http.Request) {
        resp := PhysicsResponse{
            X:        carState.Position.X,
            Y:        carState.Position.Y,
            Z:        carState.Position.Z,
            Rotation: carState.Rotation,
            Speed:    carState.Velocity.Magnitude() * 3.6,
            Gear:     carState.Gear,
        }
        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(resp)
    })

    http.ListenAndServe(":8080", nil) // lovable.dev will override port
}
