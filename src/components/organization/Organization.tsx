/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Tree, TreeNode } from "react-organizational-chart";

const orgChartData = {
  name: "Kepala Dinas",
  title: "Elpandi, S.Ag, M.H",
  children: [
    {
      name: "Sekretaris",
      title: "Maya Sukanti, S.Sos, M.Si",
      children: [
        {
          name: "Sub Bagian Umum dan Kepegawaian",
          title: "Radhiatul Jannah Zalukhu, S.Sos, M.Si",
          children: [
            { name: "Ketua Tim Substansi Keuangan Dan Program", title: "Fera H.Br.Ginting, A.Md", children: [
                {name: "Anggota", title:"Idham"},
                {name: "Anggota", title:"Fadillah Marpaung"}
            ] },
            { name: "Penyusun Program Anggaran Dan Pelaporan", title: "Diva Owen, SE" },
          ],
        },
        {
          name: "Bidang Arsip",
          title: "Suherman Batubara, SE, M.Si",
          children: [
            { name: "Ketua Tim Substansi Pembinaan Dan Pengawasan Kearsipan", title: "Ponirin, S.AP" },
            { name: "Ketua Tim Substansi Pengelolaan Arsip", title: "Bobby Irwansyah Saragih, SE" },
          ],
        },
        {
          name: "Bidang Perpustakaan",
          title: "Soefa Meylita Azani, SE, M.Si",
          children: [
            { name: "Ketua Tim Substansi Pengembangan Perpustakaan", title: "Rita Jumaidar, S.AG", children: [{name: "Anggota", title:"Sri Sutisna"}] },
            { name: "Ketua Tim Substansi Layanan, Pengolahan, Dan Pelestarian", title: "Hermayanti Syahfitri, S.Sos", children: [{name: "Anggota", title: "Erika Sinaga"}] },
          ],
        },
      ],
    },
  ],
};

// Recursive function to render each node from the JSON data
const renderTree = (node: any) => (
  <TreeNode
    label={
      <div className="flex items-center justify-center">
        <div className="bg-white p-4 rounded shadow-xl">
          <strong>{node.name}</strong>
          {node.title && (
            <>
              <br />
              {node.title}
            </>
          )}
        </div>
      </div>
    }
  >
    {node.children && node.children.map((child: any, index: number) => <React.Fragment key={index}>{renderTree(child)}</React.Fragment>)}
  </TreeNode>
);

const OrganizationChart: React.FC = () => (
  <div className="w-full">
    <Tree
      label={
        <div className="flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-xl">
            <strong>{orgChartData.name}</strong>
            <br />
            {orgChartData.title}
          </div>
        </div>
      }
    >
      {orgChartData.children && orgChartData.children.map((child, index) => <React.Fragment key={index}>{renderTree(child)}</React.Fragment>)}
    </Tree>
  </div>
);

export default OrganizationChart;
