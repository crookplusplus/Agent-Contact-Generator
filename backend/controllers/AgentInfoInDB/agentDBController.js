const Agent = require("../../models/agentModel");
const ApiCall = require("../../models/apiCallModel");
const User = require("../../models/userModel");
const { Parser } = require("json2csv");
var pdfmake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfmake.vfs = pdfFonts.pdfMake.vfs;


const getAgentbyId = async (req, res) => {
  const agentId = req.body.agent_id;

  try {
    const agent = await Agent.findById(agentId);

    if (!agent) {
      return res.status(404).json({ error: "Agent not found" });
    }

    res.json(agent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//function to get list of agents from database
const getAgentListByListId = async (req, res) => {
  const listId = req.body.list_id;

  try {
    //find all agents in the database with the list_id
    const agentList = await Agent.find({ APICall_id: listId });

    if (!agentList) {
      return res.status(404).json({ error: "Agent list not found" });
    }
    if (agentList.length === 0) {
      return res.status(404).json({ error: "Agent list not found" });
    }

    res.json(agentList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//function to update agent contact status in database
const updateAgentContactStatus = async (req, res) => {
  const agentId = req.params.id;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    const agent = await Agent.findById(agentId);
    const apiCall = await ApiCall.findById(agent.APICall_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!agent) {
      return res.status(404).json({ error: "Agent not found" });
    }
    if (!apiCall) {
      return res.status(404).json({ error: "API Call not found" });
    }
    
    const change = agent.contacted ? -1 : 1;
    agent.contacted = !agent.contacted;
    await agent.save();
    user.agentsContacted = user.agentsContacted + change;
    await user.save();
    apiCall.agents_contacted = apiCall.agents_contacted + change;
    await apiCall.save();

    res.json({upList: apiCall._id, upAgent: agent._id, change: change, mssg: "Agent contact status updated"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//function to delete agent from database by id and decrements api call num_agents by 1
const deleteAgent = async (req, res) => {
  const agentId = req.body.agent_id;

  try {
    const agent = await Agent.findById(agentId);

    if (!agent) {
      return res.status(404).json({ error: "Agent not found" });
    }

    const apiCall = await ApiCall.findById(agent.APICall_id);
    await Agent.deleteOne({ _id: agent._id });
    apiCall.num_agents = Number(apiCall.num_agents) - 1;
    await apiCall.save();

    res.json({ message: "Agent removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//function to download list of agents from database
const downloadAgentList = async (req, res) => {
  try {
    const listId = req.params.id;
    const form = req.params.form;
    const userId = req.user._id;

    const user = await User.findById(userId);
    const agentList = await Agent.find({ APICall_id: listId });

    if (!agentList || agentList.length === 0) {
      return res.status(404).json({ error: "Agent list not found" });
    }
    
    if (form === "csv") {
      // CSV generation code...
      const fields = [
        { label: 'First Name', value: 'first_name' },
        { label: 'Last Name', value: 'last_name' },
        { label: 'Nick Name', value: 'nick_name' },
        { label: 'Broker', value: 'broker' },
        { label: 'Email', value: 'email' },
        { label: 'Address', value: 'address' },
        { label: 'City', value: 'city' },
        { label: 'State', value: 'state' },
        { label: 'Zip', value: 'zip' },
        { label: 'Website', value: 'website' },
        { label: 'Number of Transactions', value: 'num_transactions' },
        { label: 'Mobile', value: 'mobile' },
        { label: 'Business', value: 'business' },
        { label: 'Contacted', value: 'contacted' },
      ];
      const opts = { fields };
      
      const json2csvParser = new Parser(opts);
      const csv = json2csvParser.parse(agentList);
      
      res.header("Content-Type", "text/csv");
      res.attachment("agentList.csv");
      res.status(200).send(csv);
    } 
    else if (form === "pdf") {
      // PDF generation code...
      const docDefinition = {
        pageOrientation: 'landscape',
        content: [
          {
            table: {
              headerRows: 1,
              pageOrientation: 'landscape',
              widths: ['8%', '8%', '5%', '12%', '10%', '10%', '15%', '15%', '10%', '4%', '4%', '*', '*', '*'],
              body: [
                ['First Name', 'Last Name', 'Nick Name', 'Broker', 'Numbers', 'Email', 'Address', 'Region', 'Website', 'Number of Transactions', 'Contacted'],
                ...agentList.map(agent => [
                  agent.first_name,
                  agent.last_name,
                  agent.nick_name,
                  agent.broker,
                  `${agent.mobile ? `M:${agent.mobile}` : ''} ${agent.business ? `B:${agent.business}` : ''}`,
                  agent.email,
                  agent.address,
                  `${agent.city} ${agent.state} ${agent.zip}`,
                  agent.website,
                  agent.num_transactions,
                  agent.contacted
                ])
              ]
            }
          }
        ],
        styles: {
          tableBodyEven: {},
          tableBodyOdd: {},
          tableHeader: {},
          tableFooter: {},
          title: {},
          header: {},
          subheader: {},
          quote: {},
          small: {
            fontSize: 8 
          }
        },
        defaultStyle: {
          fontSize: 9 
        }
      };
      console.log("wheres the pdf"); 
      var pdfDoc = pdfmake.createPdf(docDefinition);
      pdfDoc.getBuffer((buffer) => {
        res.writeHead(200, {
          'Content-Length': Buffer.byteLength(buffer),
          'Content-Type': 'application/pdf',
          'Content-disposition': 'attachment;filename=agentList.pdf',
        });
        res.end(buffer);
      });
    } else {
      throw new Error("Invalid form type");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = { getAgentbyId, 
    getAgentListByListId, 
    updateAgentContactStatus,
    deleteAgent,
    downloadAgentList };
