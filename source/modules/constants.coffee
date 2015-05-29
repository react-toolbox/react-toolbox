###
@todo
###

module.exports =
  STORAGE   :
    SESSION : "material-console-session"

  SUBROUTES:
    CAMPAIGNS: [
      label: "list", route: "/console/campaigns"
    ,
      label: "reports", route: "/console/campaigns/reports"
    ]

    CREATIVES: [
      label: "list", route: "/console/creatives/list"
    ]
